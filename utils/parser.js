module.exports = {
  plot_option_parser: (plot_option) => {
    // parse plot_option
    let res = { y_label: plot_option.split(' ') };
    return res;
  },
  parse_data_line: (line) => {
    // line = line.replace(/\s+/g, ',');
    return line.match(/-?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);
  }
}
