window.onload = init;

addEventListener('resize', setDropdownListPosition);

let menus = [];

class DropdownMenu {
    constructor(linkId, listId, startAnchorId="academicsDropdown", endAnchorId = "aboutDropdown") {
        this.linkId = linkId;
        this.listId = listId;
        this.startAnchorId = startAnchorId;
        this.endAnchorId = endAnchorId;
        this.initialize();
    }
    initialize() {
        this.link = document.getElementById(this.linkId);
        this.list = document.getElementById(this.listId);
        this.startAnchor = document.getElementById(this.startAnchorId).getBoundingClientRect();
        this.endAnchor = document.getElementById(this.endAnchorId).getBoundingClientRect();
        this.link.onmouseover = this.show.bind(this);
        this.link.onmouseout = this.hide.bind(this);
    }
    //! Find a way to keep bottom border on link when inside either the link or the list.
    //! Bottom border disappears when moving mouse out of the link. hide seems to be called quickly when moving out of the link into the list.
    show() {
        this.list.style.display = "block";
    }
    hide() {
        this.list.style.display = "none";
    }
}

function setDropdownListPosition() {
    for(const m of menus) {
        m.initialize();
        m.list.style.top = `${m.startAnchor.y + m.startAnchor.height}px`;
        m.list.style.left = `${m.startAnchor.left-100}px`;
        m.list.style.right = `${(innerWidth-m.endAnchor.left) - m.endAnchor.width}px`;
    }
}

function init() {
    menus.push(new DropdownMenu("academicsDropdown", "academicsDropdownList"));
    menus.push(new DropdownMenu("admissionsDropdown", "admissionsDropdownList"));
    menus.push(new DropdownMenu("campuslifeDropdown", "campuslifeDropdownList"));
    menus.push(new DropdownMenu("communityDropdown", "communityDropdownList"));
    menus.push(new DropdownMenu("aboutDropdown", "aboutDropdownList"));
    setTimeout(() => {
        setDropdownListPosition();
    }, 100);
}