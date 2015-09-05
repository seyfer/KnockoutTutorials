$(function () {
    function WebmailViewModel() {
        // Data
        var self = this;
        self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
        self.chosenFolderId = ko.observable();
        self.chosenMailData = ko.observable();
        self.chosenFolderData = ko.observable();

        //no access :(
        self.dataLink = 'http://learn.knockoutjs.com';

        // Behaviours
        self.goToFolder = function (folder) {
            location.hash = folder
        };
        self.goToMail = function (mail) {
            location.hash = mail.folder + '/' + mail.id
        };

        // Client-side routes
        Sammy(function () {
            this.get('#:folder', function () {
                self.chosenFolderId(this.params.folder);
                self.chosenMailData(null);

                //original
                //$.get("/mail", {folder: this.params.folder}, self.chosenFolderData);

                var link = "mail/" + this.params.folder + ".json";
                $.get(link, {}, self.chosenFolderData);
            });

            this.get('#:folder/:mailId', function () {
                self.chosenFolderId(this.params.folder);
                self.chosenFolderData(null);

                //original
                //$.get("/mail", {mailId: this.params.mailId}, self.chosenMailData);

                //only ID 1 added for example
                var link = "mail/" + this.params.folder + "/" + this.params.mailId + ".json";
                $.get(link, {}, self.chosenMailData);
            });

            this.get('', function () {
                this.app.runRoute('get', '#Inbox')
            });
        }).run();

        /*
         * Old approach before Summy
         *
         // Behaviours
         self.goToFolder = function(folder) {
         self.chosenFolderId(folder);
         self.chosenMailData(null); // Stop showing a mail
         $.get('/mail', { folder: folder }, self.chosenFolderData);
         };

         self.goToMail = function(mail) {
         self.chosenFolderId(mail.folder);
         self.chosenFolderData(null); // Stop showing a folder
         $.get("/mail", { mailId: mail.id }, self.chosenMailData);
         *
         * old
         *
         self.goToFolder('Inbox');
         */
    };

    ko.applyBindings(new WebmailViewModel());
});
