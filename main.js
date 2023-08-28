window.onload = init;

addEventListener('resize', setDropdownListPosition);

let menus = [];

class DropdownMenu {
    constructor(linkId, listId, anchorId="academicsDropdown") {
        this.linkId = linkId;
        this.listId = listId;
        this.anchorId = anchorId;
        this.initialize();
    }
    initialize() {
        this.link = document.getElementById(this.linkId);
        this.list = document.getElementById(this.listId);
        this.anchor = document.getElementById(this.anchorId).getBoundingClientRect();
        this.link.onmouseover = this.show.bind(this);
        this.link.onmouseout = this.hide.bind(this);
    }
    show() {
        this.list.style.display = "block";
    }
    hide() {
        this.list.style.display = "none";
    }
}

function setDropdownListPosition() {
    console.log("resizing");
    for(const m of menus) {
        m.initialize();
        m.list.style.top = `${m.anchor.y + m.anchor.height}px`;
        m.list.style.left = `${m.anchor.left-100}px`;
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