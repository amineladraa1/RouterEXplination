import React from "react";

function Link({ className, href, children }) {
  const handleClick = (e) => {
    if (e.metaKkey || e.ctrlKey) return;
    e.preventDefault();
    window.history.pushState({}, "", href);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  return (
    <div>
      <a onClick={handleClick} className={className} href={href}>
        {children}
      </a>
    </div>
  );
}

export default Link;
