
var metadata = {
    "x": [],
    "y": [],
    "chart": "bar" 
};

function draw_feature(){
    $("#x-axis").html("");
    $("#y-axis").html("");
    metadata["x"].forEach(function(item, index){
      $("#x-axis").append('<div class="feature-box" data-feature="' + item['feature'] + '"><i class="fas fa-hashtag"></i> ' + item['feature'] + ' <div class="feature-toolbar"><a href="#" class="text-warning" id="feature-edit-button"><i class="fas fa-pencil-alt"></i></a><a href="#" class="text-danger"><i class="fas fa-times"></i></a></div></div>')
    });
    metadata["y"].forEach(function(item, index){
        $("#y-axis").append('<div class="feature-box" data-feature="' + item['feature'] + '"><i class="fas fa-hashtag"></i> ' + item['feature'] + ' <div class="feature-toolbar"><a href="#" class="text-warning" id="feature-edit-button"><i class="fas fa-pencil-alt"></i></a><a href="#" class="text-danger"><i class="fas fa-times"></i></a></div></div>')
    });
}

function init_drag_drop(){
    // Init Dragable
    $('.draggable').draggable({
        revert: "invalid",
        appendTo: 'body',
        stack: ".draggable",
        helper: 'clone'
    });

    // Init Dropable
    $('.droppable').droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            var id = ui.draggable.attr("data-feature");
            var location = $(this).attr("data-location");
            if (location == 'x'){
                metadata['x'].push({
                    'feature': id,
                    'function': 'normal'
                });
            } else if (location == 'y'){
                metadata['y'].push({
                    'feature': id,
                    'function': 'normal'
                });
            } 
            draw_feature();
        }
    });
}

$(document).ready(function(){
    
    init_drag_drop();

    $("#load-data-button").click(function(){
        var filename = $("#load-file").val();
        $.get("/load/" + filename, function(data){
            $("#feature-container").html("");
            $.each(data['shape'], function(index, item){
                $("#feature-container").append('<div class="feature-selector draggable" data-feature="' + index + '"><i class="fas fa-hashtag"></i> &nbsp; ' + index + '</div>');
            });
            init_drag_drop();
            $("#load-file-modal").modal('hide');
        });
    });
});