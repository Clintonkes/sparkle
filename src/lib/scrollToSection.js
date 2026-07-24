export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function handleSectionLinkClick(id) {
  return (e) => {
    e.preventDefault();
    scrollToSection(id);
  };
}
