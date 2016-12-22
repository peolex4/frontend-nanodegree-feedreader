/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        describe('Each feed name', function() {
            /* TODO: Write a test that loops through each feed
            * in the allFeeds object and ensures it has a "name" defined
            * and that the "name" is not empty.
            */
            //for each Feed it checks if the "name" attribute is defined and not empty
            it('is defined and not empty', function() {
                function testNameDefined(item) {
                    expect(item.name).toBeDefined();
                    expect(item.name).not.toEqual("");
                }
                allFeeds.forEach(testNameDefined);
            });
        });

        describe('Each feed url', function() {
            /* TODO: Write a test that loops through each feed
            * in the allFeeds object and ensures it has a URL defined
            * and that the URL is not empty.
            */
            //for each Feed it checks if the "url" attribute is defined and not empty
            it('is defined and not empty', function() {
                function testURLDefined(item) {
                    expect(item.url).toBeDefined();
                    expect(item.url).not.toEqual("");
                }
                allFeeds.forEach(testURLDefined);
            });
        });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is initially hidden', function() {
            //checking if by default the menù is hidden
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
            //I discovered the way below later so, since the body tag is the only one having the 'menu-hidden' class I think it's ok also in this way here.
            //expect($('body').hasClass("menu-hidden")).toBe(true);

        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          //Checking if the click function removes and hides the class that actually make it hidden or not.
        it('changes visibility clicking "hamburger" icon', function () {
            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).toBe(false);

            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            console.log('vai');
            loadFeed(0, done);
        });
        //Checking if there's at least one element
        it('are well loaded on page', function () {
            expect($('.feed').is(':empty')).not.toBe(true);
            //it helped me much! particularly the second one, founded in the first.
            //http://html-tuts.com/check-if-div-is-empty-html-element-has-children-tags/
            //http://www.w3schools.com/cssref/sel_empty.asp
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         //loading the first Feed!
        var oldFeed;
        beforeEach(function(done) {
            //I start from first Feed because if not will be there two visible changes since in the previous test suite it loads the first.
            loadFeed(0, function() {
              oldFeed =  $('.feed').html();
              //I choosed the third Feed because it Rocks!
              loadFeed(2, done);
            });
        });

        //comparing old Feed with the new one.
        it('loads and the page is updated!', function() {
            expect($('.feed').html()).not.toEqual(oldFeed);
        });
    });

}());
