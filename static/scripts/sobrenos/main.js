import About from './modules/about.js';
import Timeline from './modules/timeline.js';
import Press from './modules/press.js';
import Contact from './modules/contact.js';

$(function() {
    const App = {
        init() {
            console.log('### APP INITIALIZED ###');
            About.init();
            Timeline.init();
            Press.init();
            Contact.init();
        },
    };

    App.init();
});