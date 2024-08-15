const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

/* 
1. Select and cache the <main> element in a variable named mainEl.
2. Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
3. Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
4. Add a class of flex-ctr to mainEl.
Hint: Use the Element.classList API. 
 */

const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

/* 
1. Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
2. Set the height of the topMenuEl element to be 100%.
3. Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
4. Add a class of flex-around to topMenuEl.
*/

const topMenuEl = document.querySelector("#top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

/* 
1. Iterate over the entire menuLinks array and for each "link" object:
2. Create an <a> element.
3. On the new element, add an href attribute with its value set to the href property of the "link" object.
4. Set the new element's content to the value of the text property of the "link" object.
5. Append the new element to the topMenuEl element.
*/
menuLinks.forEach((element) => {
  const alink = document.createElement("a");
  alink.href = element.href;
  alink.textContent = element.text;
  topMenuEl.appendChild(alink);
});

// Second Part of Quiz start form here

/*..
1.Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
2. Set the height subMenuEl element to be "100%".
3.Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
4. Add the class of flex-around to the subMenuEl element 
5. Set the CSS position property of subMenuEl to the value of absolute.
6. Set the CSS top property of subMenuEl to the value of 0.
..*/

const subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

/*..
1. Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
2. Attach a delegated 'click' event listener to topMenuEl.
-----The first line of code of the event listener function should call the event object's preventDefault() method.
-----The second line of code of the function should immediately return if the element clicked was not an <a> element.
Log the content of the <a> to verify the handler is working.
..*/

const topMenuLinks = topMenuEl.querySelectorAll("a");

topMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName !== "A") {
    return;
  }
  console.log(e.target.textContent);

  /*..
  --LAST REQUIREMENT---
  If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
  ..*/
  if (e.target.textContent === "about") {
    mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;
    subMenuEl.style.top = "0";
    topMenuLinks.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");
  }

  /*..
  1. The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.

  2. The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.

 3. Within the event listener, if the clicked <a> element does not yet have a class of "active" (it was inactive when clicked):
 ----- If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
 ----- Otherwise, set the CSS top property of subMenuEl to 0.
..*/

  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    subMenuEl.style.top = "0";
    return;
  }

  topMenuLinks.forEach((link) => {
    link.classList.remove("active");
  });
  e.target.classList.add("active");

  const clickedMenuLink = menuLinks.find(
    (link) => link.text === e.target.textContent
  );

  if (clickedMenuLink && clickedMenuLink.subLinks) {
    subMenuEl.style.top = "100%";
    buildSubmenu(clickedMenuLink.subLinks);
  } else {
    subMenuEl.style.top = "0";
  }
});

/*..
1. Clear the current contents of subMenuEl.
2. Iterate over the subLinks array, passed as an argument, and for each "link" object:
--- Create an <a> element.
--- Add an href attribute to the <a>, with the value set by the href property of the "link" object.
--- Set the element's content to the value of the text property of the "link" object.
--- Append the new element to the subMenuEl.

Once you have created your helper function, include it in the event listener within the same logic that shows the submenu, remembering to pass the array of sub-links as an argument.
..*/

function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = "";
  subLinks.forEach((link) => {
    const subLinkEl = document.createElement("a");
    subLinkEl.href = link.href;
    subLinkEl.textContent = link.text;
    subMenuEl.appendChild(subLinkEl);
  });
}

/*..
1. Attach a delegated 'click' event listener to subMenuEl.
 --- The first line of code of the event listener function should call the event object's preventDefault() method.
 --- The second line of code within the function should immediately return if the element clicked was not an <a> element.
 --- Log the content of the <a> to verify the handler is working.
2. Next, the event listener should set the CSS top property of subMenuEl to 0.
3. Remove the active class from each <a> element in topMenuLinks.
4. Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.


THIS LAST PART CODE IS REFERENCED ABOVE AS --LAST REQUIREMENT---
This is because we already query selected the topMenuLinks above and no need to repeat that again here. 
5. If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
..*/
subMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName !== "A") {
    return;
  }
  console.log(e.target.textContent);

  subMenuEl.style.top = "0";
  topMenuLinks.forEach((link) => {
    link.classList.remove("active");
  });

  mainEl.innerHTML = `
  <h1>${e.target.textContent}
    </h1>`;
});
