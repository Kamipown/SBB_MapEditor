var Canvas =
{
	map_canvas: document.getElementById("map_canvas"),
	map_ctx: undefined,

	map_width: undefined,
	map_height: undefined,

	tilesheet_canvas: document.getElementById("tilesheet_canvas"),
	tilesheet_ctx: undefined,
	tilesheet: undefined,

	selected_x: 0,
	selected_y: 0,

	map: undefined,

	left_click: false,
	right_click: false,

	last_x: -1,
	last_y: -1,

	init: function(map_name, map_width, map_height, tilesheet_name, tilesheet)
	{
		// Tilesheet Canvas
		this.tilesheet = tilesheet;

		this.tilesheet_canvas.style.width = this.tilesheet.naturalWidth + "px";
		this.tilesheet_canvas.style.height = this.tilesheet.naturalHeight + "px";
		this.tilesheet_canvas.width = this.tilesheet.naturalWidth;
		this.tilesheet_canvas.height = this.tilesheet.naturalHeight;

		this.tilesheet_ctx = this.tilesheet_canvas.getContext("2d");
		this.tilesheet_ctx.imageSmoothingEnabled = false;
		this.tilesheet_ctx.strokeStyle = "#ffffff";
		this.tilesheet_ctx.lineWidth = 1;
		this.tilesheet_ctx.drawImage(this.tilesheet, 0, 0);
		this.select_tile({layerX: 0, layerY: 0});

		// Map Canvas
		this.map_canvas.style.width = map_width * 40 + "px";
		this.map_canvas.style.height = map_height * 40 + "px";
		this.map_canvas.width = map_width * 40;
		this.map_canvas.height = map_height * 40;

		this.map_ctx = this.map_canvas.getContext("2d");
		this.map_ctx.imageSmoothingEnabled = false;

		// Map
		this.map =
		{
			name: map_name,
			size:
			{
				x: map_width,
				y: map_height,
			},
			tilesheet: tilesheet_name,
			tiles: []
		};
		for (var i = 0; i < map_height; ++i)
		{
			this.map.tiles[i] = [];
			for (var j = 0; j < map_width; ++j)
				this.map.tiles[i][j] = 0;
		}
	},

	select_tile: function(e)
	{
		this.selected_x = Math.floor(e.layerX / 40);
		this.selected_y = Math.floor(e.layerY / 40);

		var start_x = this.selected_x * 40;
		var start_y = this.selected_y * 40;

		this.tilesheet_ctx.clearRect(0, 0, this.tilesheet_canvas.width, this.tilesheet_canvas.height);
		this.tilesheet_ctx.drawImage(this.tilesheet, 0, 0);
		this.tilesheet_ctx.beginPath();
		this.tilesheet_ctx.rect(start_x + 0.4, start_y + 0.4, 39.4, 39.4);
		this.tilesheet_ctx.stroke();
		this.tilesheet_ctx.closePath();
	},

	mouse_down: function(e)
	{
		if (e.buttons == 1)
		{
			this.left_click = true;
			this.mouse_move(e);
		}
		else if (e.buttons == 2)
		{
			this.right_click = true;
			this.mouse_move(e);
		}
	},

	mouse_up: function(e)
	{
		this.left_click = false;
		this.right_click = false;
		this.last_x = -1;
		this.last_y = -1;
	},

	mouse_move: function(e)
	{
		var x = Math.floor(e.layerX / 40);
		var y = Math.floor(e.layerY / 40);
		if (this.left_click)
		{
			if (this.last_x != x || this.last_y != y)
			{
				this.draw_tile(x, y);
				this.last_x = x;
				this.last_y = y;
			}
		}
		else if (this.right_click)
		{
			if (this.last_x != x || this.last_y != y)
			{
				this.remove_tile(x, y);
				this.last_x = x;
				this.last_y = y;
			}
		}
		
	},

	draw_tile: function(x, y)
	{
		var start_x = x * 40;
		var start_y = y * 40;

		this.map_ctx.clearRect(start_x, start_y, 40, 40);
		this.map_ctx.drawImage(
			this.tilesheet,
			this.selected_x * 40,
			this.selected_y * 40,
			40,
			40,
			start_x,
			start_y,
			40,
			40
		);
		this.map.tiles[y][x] = this.selected_x + this.selected_y * 5;
	},

	remove_tile: function(x, y)
	{
		this.map_ctx.clearRect(x * 40, y * 40, 40, 40);
		this.map.tiles[y][x] = 0;
	}
}