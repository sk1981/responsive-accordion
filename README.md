# Responsive Tabs/Accordion

## Notes
* As this was more about implementation, I am not following practices like minifying, concatenating, using SASS,
 using module loader, using auotprefixer and so on to keep the build simple.
* I am using pure javascript which is supported in all the given browsers instead of loading a library like jQuery

## Part 1
Implement an accordion component which transforms to tabs for wider screens

### Link
Code is accessible at under the challenge1 folder
Demo url is at :

### Approaches considered
#### Managing state with CSS
* To manage state of open/closed tabs using only CSS we can use checkbox/:checked combination,
 radio/:checked target combination or link/:target combination.
* Disadvantage of link/:target combination is that it distorts the url and can cause slight jerk in page.
* checkbox/:checked combination does not suits our use case as we only need to open one element at a time.
* Hence, I went with "link/:target combination".

#### Responsive Design
The biggest challenge in responsive design is that on smaller screens each accordion content is displayed just after the title,
 but on larger screens (> 768px) we first display all the titles first and then the content.
There are few ways to manage to an accordion which transforms, listing down the approaches and my choice.

##### Two different layouts
* Easiest approach would be two have two different html structure, one which is visible on small screens and
 one which would be visible on large screens.
* For example, our small screen layout which have title element after tab element, where as on large screens we will
have first all the title and then the contents
* Pros: Browser support as defined, no JS required
* Cons: Lots of duplication of content
* Due to too much duplication avoiding this approach

##### Absolute positioning
* We only need to have one html structure, where the content is after title.
* For large screens we can just use absolute positioning to move the content out of the flow and
 position it below the title.
* Pros: Browser support as defined, no JS required
* Cons: We are restricted form using absolute position, due to which this approach cannot be applied.

##### Flexbox
* We only need to have one html structure, where the content is after title.
* For large screens we can use order attribute to ensure that title is displayed first
* Pros: no JS required in general
* Cons: Does not support all IE9, which is one of the required browsers.

##### JS Solution
* Using Javascript it becomes very simple as we can just append classes as required or move the dom elements.

##### Other
* Using transforms or relative positions also will not work as we need fluid height.
* Using table layout and table-header-group also does not works as that is only applicable when
we have very few elements.

##### Solution
* I went with Flexbox approach, as I felt it matched most of the requirements wihtout many cons.
* Too ensure it works for IE 9 also, I added some JS which is IE 9 only but will not be loaded for other browsers.
* So, my final solution is : Pure CSS for IE10 and above and other browsers and a small JS for IE 9 only.

