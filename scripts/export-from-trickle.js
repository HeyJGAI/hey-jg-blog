/*
 * HOW TO USE:
 * 1. Open your live Trickle-hosted blog in a browser tab (the actual site, not this project).
 * 2. Open DevTools (F12) -> Console tab.
 * 3. Paste this whole script in and press Enter.
 * 4. It downloads a file called hey-jg-blog-export.json — send that file back
 *    to Claude and it will generate the exact SQL insert statements to load
 *    your real posts/tags/about content/profile/settings into Supabase.
 *
 * This only works on the live Trickle site itself, because trickleListObjects
 * etc. are functions Trickle's own hosting injects into the page — they don't
 * exist anywhere else, which is exactly the problem this whole migration fixes.
 */
(async () => {
    const listAll = async (type) => {
        let all = [];
        let token = null;
        do {
            const res = await trickleListObjects(type, 100, true, token);
            all = all.concat(res.items || []);
            token = res.nextPageToken;
        } while (token);
        return all;
    };

    const dump = {};
    dump.posts = await listAll('post');
    dump.tags = await listAll('tag');
    dump.aboutTabs = await listAll('about-tab');

    try {
        dump.profile = (await trickleGetObject('profile', 'user-profile')).objectData;
    } catch (e) {
        dump.profile = null;
    }
    try {
        dump.siteSettings = (await trickleGetObject('site-settings', 'hf-content')).objectData;
    } catch (e) {
        dump.siteSettings = null;
    }

    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hey-jg-blog-export.json';
    a.click();

    console.log('Downloaded hey-jg-blog-export.json —', dump.posts.length, 'posts,', dump.aboutTabs.length, 'about tabs.');
})();
