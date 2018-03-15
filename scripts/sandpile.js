var sandpile = function() {
    //////////////////////////////////////
    // START DRAWING CODE
    //////////////////////////////////////

    var _data; // data from previous update
    var built = 0; 

    function draw_grid(data, colors) {
        var color_obj = {};
        for (var i = 0; i < colors.length; i += 2) {
            color_obj[colors[i]] = colors[i + 1];
        }
        var width = 600;
        var height = 600;
        var grid_length = data.length;
        var width_cell = width / grid_length;
        var height_cell = height / grid_length;

        var canvas = document.getElementById("grid")
        if (canvas == null) {
            canvas = document.createElement('canvas');
            canvas.id = "grid";
            canvas.width = width;
            canvas.height = height;
            document.getElementsByTagName('body')[0].appendChild(canvas);
        }

        if (built == 0) { 
            canvas.width = 600; 
            canvas.height = 600; 
            built = 1; 
        }

        var context = canvas.getContext("2d");

        function draw_cells() {
            for (var i = 0; i < grid_length; i++) {
                for (var ii = 0; ii < grid_length; ii++) {
                    if (_data && _data[i][ii] === data[i][ii]) {
                        continue;
                    }
                    context.fillStyle = color_obj[data[i][ii]];
                    context.fillRect(i * width_cell, ii * height_cell, width_cell, height_cell);
                }
            }
        }
        draw_cells();
        if (!_data) {
            _data = [];
        }
        for (var i = 0; i < grid_length; i++) {
            _data[i] = data[i].slice();
        }
    }

    function update_grid(data, colors) {
        draw_grid(data, colors);
    }


    //////////////////////////////////////
    // END DRAWING CODE
    //////////////////////////////////////			

    var grid_length = 300;
    var grid = [];
    var temp_grid = [];
    var colors = ["0", "#ffffff", "1", "#00bfff", "2", "#ffd700", "3", "#b03060"];
    var population = [];

    var start_i;
    var start_ii;

    var continue_drawing = true;
    var grain_counter = 0;



    function init_grid() {
        for (var i = 0; i < grid_length; i = i + 1) {
            grid[i] = [];
            for (var ii = 0; ii < grid_length; ii = ii + 1) {
                grid[i][ii] = 0;
            }
        }
        start_i = Math.round(grid_length / 2);
        start_ii = Math.round(grid_length / 2);
    }

    init_grid();

    draw_grid(grid, colors);

    run_and_draw();

    function run_and_draw() {
        var cd = continue_drawing;
        // the global variable continue_drawing can be set via iframe
        // to stop the simulation
        while (cd) {
            run_time_step();
            if (grain_counter % 1000 == 0) {
                cd = false;
                update_grid(grid, colors);
                setTimeout(function () {
                    run_and_draw();
                }, 1000);
            }
        }
    }


    function run_time_step() {
        add_sand(start_i + Math.ceil(Math.random() * 4), start_ii + Math.ceil(Math.random() * 4));
        grain_counter++;
    }

    function add_sand(i, ii) {
        var grains = grid[i][ii];
        if (grains < 3) {
            grid[i][ii]++;
        }
        else {
            grid[i][ii] = grains - 3;
            if (i > 0) {
                add_sand(i - 1, ii);
            }
            if (i < grid_length - 1) {
                add_sand(i + 1, ii);
            }
            if (ii > 0) {
                add_sand(i, ii - 1);
            }
            if (ii < grid_length - 1) {
                add_sand(i, ii + 1);
            }
        }
    }
}; 