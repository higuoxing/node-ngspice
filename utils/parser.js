module.exports = {
  plot_option_parser: (plot_option) => {
    // parse plot_option
    let res = { y_label: plot_option.split(';') };
    return res;
  },
  parse_data_line: (line, prev_flags) => {
    /*
     * return new_flags
     * flags = [{
     *   direction_of_sequence: Int, // sequence
     *   value: Float,               // value
     *   value_position: Int,        // value position
     *   belong_to: Int,             // curve color will depend on this
     *   new_curve: Boolean }]       // new curve indicator
     * */
    // line = line.replace(/\s+/g, ',');
    if (prev_flags.length === 0) {
      console.log('this is the first line');

    } else {
      console.log('this is not the first line');
    }

    return line.match(/-?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);
  }
}
