// When the document is ready ...
$(function() {

    // Add click event to the button for getAllUsers
    $("button.getAllUsers").on("click", function() {
        $.get("/api/users", function(data, status) {
            console.log(data);
            $("#lastMessage").html(data.htmlMessage);

            var $li = $("<li></li>").html(data.htmlMessage).addClass("eventListItem");
            $("#eventList").append($li);
        });
    });

    // Add click event to the button for getAllUsers
    $("button.getOneUser").on("click", function() {
        var $this = $(this);
        var id = $this.attr("user-id");

        $.get("/api/users/" + id, function(data, status) {
            console.log(data);
            $("#lastMessage").html(data.htmlMessage);

            var $li = $("<li></li>").html(data.htmlMessage).addClass("eventListItem");
            $("#eventList").append($li);
        });
    });

    $("#eventList").on("click", "li", function() {
        $(this).css("color", "red");
    });
});
