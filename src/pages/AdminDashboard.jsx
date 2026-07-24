import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  LogOut, LayoutDashboard, Calendar, CheckCircle, Clock, MessageSquare, ChevronDown,
  Menu, Eye, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const API_URL = import.meta.env.VITE_API_URL || "";
const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-800" },
  { value: "approved", label: "Approved", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
  { value: "completed", label: "Completed", color: "bg-blue-100 text-blue-800" },
];

const FREQUENCY_LABELS = {
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  seasonal: "Seasonal",
};

const TIME_WINDOW_LABELS = {
  morning: "Morning (8am–12pm)",
  afternoon: "Afternoon (12pm–4pm)",
  evening: "Evening (4pm–7pm)",
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });

const TAB_LABELS = {
  bookings: "Service Requests",
  contacts: "Messages",
};

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, logout, authHeaders } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [viewBooking, setViewBooking] = useState(null);
  const [viewContact, setViewContact] = useState(null);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAll();
    }
  }, [isAuthenticated]);

  const handleUnauthorized = (res) => {
    if (res.status === 401) {
      logout();
      return true;
    }
    return false;
  };

  const fetchAll = async () => {
    if (!hasLoadedOnce.current) setLoadingData(true);
    try {
      const [bookingsRes, contactsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/bookings`, { headers: authHeaders }),
        fetch(`${API_URL}/api/admin/contacts`, { headers: authHeaders }),
        fetch(`${API_URL}/api/admin/dashboard`, { headers: authHeaders }),
      ]);
      if ([bookingsRes, contactsRes, statsRes].some(handleUnauthorized)) return;
      if (bookingsRes.ok) setBookings(await bookingsRes.json());
      if (contactsRes.ok) setContacts(await contactsRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      hasLoadedOnce.current = true;
    } catch {
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoadingData(false);
    }
  };

  const refreshStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/dashboard`, { headers: authHeaders });
      if (handleUnauthorized(res)) return;
      if (res.ok) setStats(await res.json());
    } catch {
      // stats are a nice-to-have refresh; ignore transient failures here
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (handleUnauthorized(res)) return;
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? updated : b)));
      toast({
        title: "Status Updated",
        description: `Booking ${updated.reference} is now ${newStatus}.`,
      });
      refreshStats();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setConfirmSignOut(false);
    logout();
    navigate("/admin");
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-blade">
      {/* Header */}
      <header className="bg-obsidian border-b border-linen/10 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-xl font-semibold text-linen tracking-tight">
              AVENESS
            </a>
            <span className="font-mono-coord text-gold text-[10px] tracking-[0.3em]">
              ADMIN
            </span>
          </div>
          <button
            onClick={() => setConfirmSignOut(true)}
            className="inline-flex items-center gap-2 text-linen/60 hover:text-linen text-sm transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard icon={<Calendar size={18} />} label="Total Bookings" value={stats.total_bookings} />
            <StatCard icon={<Clock size={18} />} label="Pending" value={stats.pending} />
            <StatCard icon={<CheckCircle size={18} />} label="Approved" value={stats.approved} />
            <StatCard icon={<LayoutDashboard size={18} />} label="Completed" value={stats.completed} />
            <StatCard icon={<MessageSquare size={18} />} label="Messages" value={stats.total_contacts} />
          </div>
        )}

        {/* Tabs — desktop */}
        <div className="hidden sm:flex gap-1 border-b border-linen/10 mb-6">
          {["bookings", "contacts"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium tracking-wide transition-colors ${
                tab === t
                  ? "text-gold border-b-2 border-gold"
                  : "text-linen/50 hover:text-linen"
              }`}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Tabs — mobile hamburger */}
        <div className="sm:hidden flex items-center gap-3 border-b border-linen/10 mb-6 pb-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Open section menu"
              className="text-linen p-1.5 -ml-1.5 hover:text-gold transition-colors"
            >
              <Menu size={22} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-obsidian border-linen/20 text-linen">
              {["bookings", "contacts"].map((t) => (
                <DropdownMenuItem
                  key={t}
                  onClick={() => setTab(t)}
                  className={`text-linen focus:bg-linen/10 focus:text-gold cursor-pointer ${
                    tab === t ? "text-gold" : ""
                  }`}
                >
                  {TAB_LABELS[t]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-gold text-sm font-medium tracking-wide">
            {TAB_LABELS[tab]}
          </span>
        </div>

        {/* Content */}
        {loadingData ? (
          <div className="text-center py-20 text-linen/40">Loading...</div>
        ) : tab === "bookings" ? (
          <BookingsTable bookings={bookings} onUpdateStatus={updateStatus} onView={setViewBooking} />
        ) : (
          <ContactsTable contacts={contacts} onView={setViewContact} />
        )}
      </div>

      <BookingDetailDialog booking={viewBooking} onOpenChange={(open) => !open && setViewBooking(null)} />
      <ContactDetailDialog contact={viewContact} onOpenChange={(open) => !open && setViewContact(null)} />

      <AlertDialog open={confirmSignOut} onOpenChange={setConfirmSignOut}>
        <AlertDialogContent className="bg-linen text-blade border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display font-light text-2xl">Sign out?</AlertDialogTitle>
            <AlertDialogDescription className="text-blade/60">
              You'll need to log in again to access the admin dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-blade/20 text-blade hover:bg-blade/5">
              Stay signed in
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-gold text-obsidian hover:bg-gold/90"
            >
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-obsidian/50 border border-linen/10 p-5">
      <div className="flex items-center gap-2 text-gold mb-2">{icon}</div>
      <p className="font-display text-2xl text-linen font-light">{value}</p>
      <p className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] mt-1">{label.toUpperCase()}</p>
    </div>
  );
}

function usePagedData(items) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  return { page: safePage, setPage, totalPages, paged };
}

function PaginationBar({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="inline-flex items-center gap-1 text-xs text-linen/60 hover:text-linen disabled:opacity-30 disabled:hover:text-linen/60 transition-colors"
      >
        <ChevronLeft size={14} /> Prev
      </button>
      <span className="font-mono-coord text-linen/40 text-[11px] tracking-wider">
        PAGE {page} OF {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="inline-flex items-center gap-1 text-xs text-linen/60 hover:text-linen disabled:opacity-30 disabled:hover:text-linen/60 transition-colors"
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  );
}

function StatusDropdown({ booking, onUpdateStatus, open, onToggle }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium ${
          STATUS_OPTIONS.find((s) => s.value === booking.status)?.color || "bg-gray-100 text-gray-800"
        }`}
      >
        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        <ChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-obsidian border border-linen/20 shadow-lg z-10 min-w-[140px]">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              onClick={() => onUpdateStatus(booking.id, s.value)}
              className={`block w-full text-left px-4 py-2.5 text-sm text-linen hover:bg-linen/10 transition-colors ${
                booking.status === s.value ? "font-medium" : ""
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BookingsTable({ bookings, onUpdateStatus, onView }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { page, setPage, totalPages, paged } = usePagedData(bookings);

  if (bookings.length === 0) {
    return <p className="text-linen/40 text-center py-10">No service requests yet.</p>;
  }

  const handleUpdateStatus = (id, value) => {
    onUpdateStatus(id, value);
    setOpenDropdown(null);
  };

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-linen/10">
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">REF</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">NAME</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">EMAIL</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">ADDRESS</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">FREQUENCY</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">STATUS</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">DATE</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {paged.map((b) => (
              <tr key={b.id} className="border-b border-linen/5 hover:bg-linen/5 transition-colors">
                <td className="py-4 px-4 font-mono-coord text-gold text-xs">{b.reference}</td>
                <td className="py-4 px-4 text-linen text-sm">{b.name}</td>
                <td className="py-4 px-4 text-linen/70 text-sm">{b.email}</td>
                <td className="py-4 px-4 text-linen/70 text-sm max-w-[200px] truncate">{b.address}</td>
                <td className="py-4 px-4 text-linen/70 text-sm">{FREQUENCY_LABELS[b.frequency] || b.frequency}</td>
                <td className="py-4 px-4 relative">
                  <StatusDropdown
                    booking={b}
                    onUpdateStatus={handleUpdateStatus}
                    open={openDropdown === b.id}
                    onToggle={() => setOpenDropdown(openDropdown === b.id ? null : b.id)}
                  />
                </td>
                <td className="py-4 px-4 text-linen/50 text-xs font-mono-coord whitespace-nowrap">
                  {formatDateTime(b.created_at)}
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => onView(b)}
                    aria-label={`View booking ${b.reference}`}
                    className="inline-flex items-center gap-1.5 text-linen/50 hover:text-gold text-xs transition-colors"
                  >
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {paged.map((b) => (
          <div key={b.id} className="bg-obsidian/50 border border-linen/10 p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <p className="text-linen text-sm font-medium truncate">{b.name}</p>
                <p className="text-linen/60 text-xs mt-0.5 break-all">{b.email}</p>
              </div>
              <StatusDropdown
                booking={b}
                onUpdateStatus={handleUpdateStatus}
                open={openDropdown === b.id}
                onToggle={() => setOpenDropdown(openDropdown === b.id ? null : b.id)}
              />
            </div>
            <p className="font-mono-coord text-gold text-[11px] tracking-wide">{b.reference}</p>
            <p className="text-linen/50 text-xs font-mono-coord mt-1">{formatDateTime(b.created_at)}</p>
            <button
              onClick={() => onView(b)}
              aria-label={`View booking ${b.reference}`}
              className="inline-flex items-center gap-1.5 mt-3 text-gold text-xs font-medium"
            >
              <Eye size={14} /> View details
            </button>
          </div>
        ))}
      </div>

      <PaginationBar page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

function ContactsTable({ contacts, onView }) {
  const { page, setPage, totalPages, paged } = usePagedData(contacts);

  if (contacts.length === 0) {
    return <p className="text-linen/40 text-center py-10">No messages yet.</p>;
  }

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-linen/10">
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">NAME</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">EMAIL</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">SUBJECT</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">MESSAGE</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">DATE</th>
              <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {paged.map((c) => (
              <tr key={c.id} className="border-b border-linen/5 hover:bg-linen/5 transition-colors">
                <td className="py-4 px-4 text-linen text-sm">{c.name}</td>
                <td className="py-4 px-4 text-linen/70 text-sm">{c.email}</td>
                <td className="py-4 px-4 text-linen/70 text-sm max-w-[160px] truncate">{c.subject || "—"}</td>
                <td className="py-4 px-4 text-linen/70 text-sm max-w-[240px] truncate">{c.message}</td>
                <td className="py-4 px-4 text-linen/50 text-xs font-mono-coord whitespace-nowrap">
                  {formatDateTime(c.created_at)}
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => onView(c)}
                    aria-label={`View message from ${c.name}`}
                    className="inline-flex items-center gap-1.5 text-linen/50 hover:text-gold text-xs transition-colors"
                  >
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {paged.map((c) => (
          <div key={c.id} className="bg-obsidian/50 border border-linen/10 p-4">
            <div className="min-w-0">
              <p className="text-linen text-sm font-medium truncate">{c.name}</p>
              <p className="text-linen/60 text-xs mt-0.5 break-all">{c.email}</p>
            </div>
            {c.subject && (
              <p className="font-mono-coord text-gold text-[11px] tracking-wide mt-2">
                {c.subject.toUpperCase()}
              </p>
            )}
            <p className="text-linen/50 text-xs font-mono-coord mt-1">{formatDateTime(c.created_at)}</p>
            <button
              onClick={() => onView(c)}
              aria-label={`View message from ${c.name}`}
              className="inline-flex items-center gap-1.5 mt-3 text-gold text-xs font-medium"
            >
              <Eye size={14} /> View details
            </button>
          </div>
        ))}
      </div>

      <PaginationBar page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="font-mono-coord text-blade/50 text-[10px] tracking-[0.2em] mb-1">{label}</p>
      <p className="text-blade text-sm">{value}</p>
    </div>
  );
}

function BookingDetailDialog({ booking, onOpenChange }) {
  return (
    <Dialog open={!!booking} onOpenChange={onOpenChange}>
      <DialogContent className="bg-linen text-blade border-none max-w-lg">
        {booking && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display font-light text-2xl">
                Service Request
              </DialogTitle>
              <DialogDescription className="font-mono-coord text-gold text-xs tracking-wider">
                REF · {booking.reference}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-5 py-2">
              <DetailRow label="NAME" value={booking.name} />
              <DetailRow
                label="STATUS"
                value={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              />
              <DetailRow label="EMAIL" value={booking.email} />
              <DetailRow label="PHONE" value={booking.phone || "—"} />
              <div className="col-span-2">
                <DetailRow label="PROPERTY ADDRESS" value={booking.address} />
              </div>
              <DetailRow
                label="FREQUENCY"
                value={FREQUENCY_LABELS[booking.frequency] || booking.frequency}
              />
              <DetailRow
                label="PREFERRED START DATE"
                value={booking.preferred_date ? formatDate(booking.preferred_date) : "—"}
              />
              <DetailRow
                label="PREFERRED TIME"
                value={TIME_WINDOW_LABELS[booking.preferred_time] || booking.preferred_time || "—"}
              />
              <DetailRow label="SUBMITTED" value={formatDateTime(booking.created_at)} />
              <DetailRow label="LAST UPDATED" value={formatDateTime(booking.updated_at)} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ContactDetailDialog({ contact, onOpenChange }) {
  return (
    <Dialog open={!!contact} onOpenChange={onOpenChange}>
      <DialogContent className="bg-linen text-blade border-none max-w-lg">
        {contact && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display font-light text-2xl">Message</DialogTitle>
              <DialogDescription className="font-mono-coord text-gold text-xs tracking-wider">
                {formatDateTime(contact.created_at)}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-5 py-2">
              <DetailRow label="NAME" value={contact.name} />
              <DetailRow label="EMAIL" value={contact.email} />
              <DetailRow label="PHONE" value={contact.phone || "—"} />
              <DetailRow label="SUBJECT" value={contact.subject || "—"} />
              <div className="col-span-2">
                <DetailRow label="MESSAGE" value={contact.message} />
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
