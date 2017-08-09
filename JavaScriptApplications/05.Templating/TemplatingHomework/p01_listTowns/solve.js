$(() => {

    /*
         !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         to make it work -> install handlebars & jquery
         !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */

    const townsInput = $('#towns');
    const btnLoad = $('#btnLoadTowns');
    const targetList = $('#townsList');

    const context = {
        towns: []
    };
    const templates = {};

    btnLoad.click(loadTowns);

    async function loadTowns() {

        getContext();

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        loadTemplates().then((data) => {
            registerTemplates(data);
            renderTowns();
        });

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        registerTemplates(await loadTemplates());
        renderTowns();

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    function getContext() {

        context.towns = townsInput.val().split(',')
            .filter(town => town !== '')
            .map((townName) => ({ townName: townName.trim() }));
        townsInput.val('');
    }

    function loadTemplates() {
        return Promise.all([$.get('town.hbs'), $.get('townList.hbs')]);
    }

    function registerTemplates([town, townList]) {
        console.log("REGISTERING");

        Handlebars.registerPartial('town', town);

        templates.townList = Handlebars.compile(townList);
    }

    function renderTowns() {
        console.log("RENDERING");

        console.log(context.towns);
        targetList.html(templates.townList(context));
    }
});