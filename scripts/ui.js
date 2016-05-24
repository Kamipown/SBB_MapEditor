var Ui =
{
	aside_sections: [],
	active_section: 0,

	MAIN: 0, NEW: 1, IMPORT: 2, EXPORT: 3, OPTIONS: 4,

	init: function()
	{
		this.aside_sections[0] = document.getElementById("main_section");
		this.aside_sections[1] = document.getElementById("new_section");
		this.aside_sections[2] = document.getElementById("import_section");
		this.aside_sections[3] = document.getElementById("export_section");
		this.aside_sections[4] = document.getElementById("options_section");
	},

	open_section: function(section)
	{
		this.aside_sections[this.active_section].style.display = "none";
		this.active_section = section;
		if (this.active_section == this.EXPORT)
			this.prepare_export();
		this.aside_sections[this.active_section].style.display = "block";
	},

	close_section: function()
	{
		this.aside_sections[this.active_section].style.display = "none";
		this.active_section = 0;
		this.aside_sections[this.active_section].style.display = "block";
	},

	new_map: function(e)
	{
		e.preventDefault();
		var v = document.querySelectorAll("#new_section form div input")
		var map_name = v[0].value;
		var map_width = parseInt(v[1].value);
		var map_height = parseInt(v[2].value);
		var tilesheet_name = v[3].files[0].name;
		var tilesheet = new Image;
		tilesheet.onload = function()
		{
			Canvas.init(map_name, map_width, map_height, tilesheet_name, tilesheet);
			document.querySelector("#main_section .map_title").innerHTML = map_name;
			Ui.close_section();
		}
		tilesheet.src = URL.createObjectURL(v[3].files[0]);
		//Map_Canvas.new_map(name, w, h);
	},

	prepare_export: function()
	{
		var json = JSON.stringify(Canvas.map);
		var blob = new Blob([json], {type: "application/json"});
		var url = URL.createObjectURL(blob);

		var link = document.getElementById("export_link");
		link.download = "map.json";
		link.href = url;
	}
}