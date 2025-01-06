function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

export class MyBaseOption {
  datafile_id: string;
  x_colnames: string[];
  y_colnames: string[];
  title_show: boolean;
  title_text: string;
  title_top: string;
  title_left: string;
  title_color: string;
  title_fontSize: string;
  title_fontFamily: string;
  title_fontWeight: string;

  grid_show: boolean;
  grid_width: string;
  grid_height: string;
  grid_top: number;
  grid_left: string;
  grid_bottom: number;
  grid_containLabel: boolean;

  legend_show: boolean;
  legend_fontSize: number;
  constructor(datafile_id: string = "", x_colnames: string[] = [], y_colnames: string[] = [], title_show: boolean = false, title_text = "", title_top = undefined, title_left = undefined, title_color = undefined, title_fontSize = undefined, title_fontFamily = undefined, title_fontWeight = undefined, grid_show = false, grid_width = "auto", grid_height = "auto", grid_top = 60, grid_left = "10%", grid_bottom = 60, grid_containLabel = true, legend_show = false, legend_fontSize = 18) {
    this.datafile_id = datafile_id;
    this.x_colnames = x_colnames;
    this.y_colnames = y_colnames;
    this.title_show = title_show;
    this.title_text = title_text;
    this.title_top = title_top;
    this.title_left = title_left;
    this.title_color = title_color;
    this.title_fontSize = title_fontSize;
    this.title_fontFamily = title_fontFamily;
    this.title_fontWeight = title_fontWeight;

    this.grid_show = grid_show;
    this.grid_width = grid_width;
    this.grid_height = grid_height;
    this.grid_top = grid_top;
    this.grid_left = grid_left;
    this.grid_bottom = grid_bottom;
    this.grid_containLabel = grid_containLabel;

    this.legend_show = legend_show;
    this.legend_fontSize = legend_fontSize;
  }
}
