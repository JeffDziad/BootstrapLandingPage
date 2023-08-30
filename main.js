window.onload = init;

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
        this.link.onmouseenter = this.showList.bind(this);
        this.link.onmouseleave = this.hideList.bind(this);
        this.list.onmouseleave = this.hideList.bind(this);
        this.list.onmouseenter = this.showBorder.bind(this);
    }
    //! Find a way to keep bottom border on link when inside either the link or the list.
    //! Bottom border disappears when moving mouse out of the link. hide seems to be called quickly when moving out of the link into the list.
    showList() {
        closeAllMenus();
        this.list.style.display = "block";
        this.showBorder();
    }
    hideList() {
        this.list.style.display = "none";
        this.hideBorder();
    }
    showBorder() {
        this.link.style.borderBottom = "#003E7A solid 8px";
    }
    hideBorder() {
        this.link.style.borderBottom = "#003E7A solid 0px";
    }
}

function closeAllMenus() {
    for(const m of menus) {
        m.hideList();
    }
}

function setDropdownListPosition() {
    for(const m of menus) {
        m.initialize();
        m.list.style.top = `${m.startAnchor.y + m.startAnchor.height}px`;
        m.list.style.left = `${m.startAnchor.left-200}px`;
        let r = m.endAnchor.left + m.endAnchor.width;
        let w = r - m.list.style.left.split('p')[0];
        m.list.style.width = `${w}px`;
    }
}

function mouseLeaveDropdownGroup(e) {

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

    addEventListener('resize', setDropdownListPosition);
    addEventListener('scroll', setDropdownListPosition);
}