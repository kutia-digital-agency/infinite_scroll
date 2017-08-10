# AJAX Infinite scroll

## Instructions

The container has to have these attributes for the infinite scroll to work:

```html
    <!-- The infinite scroll container -->
    <div 
        class="inf-scroll"
        data-pagination=".pagination-holder"
        data-pagination-next=".pagination-holder .next-page"
        // The data-load-more is optional [if you want the loading to work with a button use the attr else remove it]
        data-load-more="#loadMore"
        data-item-class=".item-class"
        data-totalPages="20"
    >
        <div class="item-class"></div>
        <div class="item-class"></div>
    </div>

```

The load more button.
If you have set the data-load-more attribute then you need to declare an element with that id

```html

    <!-- Example load more button -->
    <a href="javascript:void(0);" id="loadMore">Load more</a>

```

The pagination.

```html

    <!-- Example pagination -->
    <div class="pagination-holder">
        <a href="http://examplaurl.com?page=1">First Page</a>

        <a href="http://examplaurl.com?page=1">1</a>

        <a class="active" href="javascript:void">2</a>

        <a class="next-page" href="http://examplaurl.com?page=3">3</a>

        <a href="http://examplaurl.com?page=4">4</a>

        <a href="http://examplaurl.com?page=4">Last page</a>
    </div>

```

Then on the footer of you site add the script to initialize the infinite scroll.

```html
    <script>
        $('.inf-scroll').initInfScroll();
    </script>

```

## License
[MIT](http://opensource.org/licenses/MIT)
