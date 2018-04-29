module.exports = {
  // parse plot option
  plot_option_parser: async (plot_option) => {
    // parse plot_option
    try {
      let res = JSON.parse(plot_option);
      return res;
    } catch (e) {
      throw e;
    }
  },

  parse_data_line: (line, prev_flags) => {
    /*
     * return new_flags
     * flags = [{
     *   direction_of_sequence: Int,     // sequence
     *   value: { x: Float, y: Float },  // value
     *   value_position: Int,            // value position
     *   belong_to: Int,                 // curve color will depend on this
     *   new_curve: Boolean,             // new curve indicator
     *   active: Boolean }]              // active indicator
     * */
    let parse_res = line.match(/-?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);
    /* this is important! or will encounter unexpected ERROR! */
    parse_res = parse_res.map(parseFloat);
    let new_flags = prev_flags;
    if (new_flags.flags.length === 0) {
      // init new_flags
      for (let i = 0; i < parse_res.length / 2; i ++) {
        // must a even list
        new_flags.flags.push({
          direction_of_sequence: 0,                                     // initial direction should be unknown
          value: { x: parse_res[2 * i], y: parse_res[2 * i + 1] },      // push x& y value
          value_position: i,                                            // should be push in
          belong_to: i,                                                 // this flag once determined will never be changed
          new_curve: true,
        });
        new_flags.total_curves += 1;
      }
      return new_flags;
    } else {
      // if this is not the first line
      for (let i = 0; i < parse_res.length / 2; i ++) {
        if (prev_flags.flags[i].direction_of_sequence == 0) {
          /* new curve and direction not determined */
          if (parse_res[2 * i] >= prev_flags.flags[i].value.x) {
            // increasing
            prev_flags.flags[i].direction_of_sequence = 1;
          } else {
            // decreasing
            prev_flags.flags[i].direction_of_sequence = 2;
          }
          prev_flags.flags[i].new_curve = false;              // set new curve flag to false;
          prev_flags.flags[i].value.x = parse_res[2 * i];     // update value
          prev_flags.flags[i].value.y = parse_res[2 * i + 1]; // update value

        } else if (prev_flags.flags[i].direction_of_sequence == 1) {
          /* not a new curve and direction is increasing */
          // console.log(prev_flags[i]);
          // check direction

          if (parse_res[2 * i] >= prev_flags.flags[i].value.x) {
            // still increasing
            prev_flags.flags[i].new_curve = false;
            prev_flags.flags[i].value.x = parse_res[2 * i    ];
            prev_flags.flags[i].value.y = parse_res[2 * i + 1];

          } else {
            // change direction
            // fork a new array
            prev_flags.flags[i].direction_of_sequence = 0;
            prev_flags.flags[i].new_curve = true;
            prev_flags.flags[i].value_position = prev_flags.total_curves;
            prev_flags.total_curves += 1;
            prev_flags.flags[i].value.x = parse_res[2 * i    ];
            prev_flags.flags[i].value.y = parse_res[2 * i + 1];
          }
        } else {
          /* not a new curve and direction is decreasing */
          // check direction
          if (parse_res[2 * i] <= prev_flags.flags[i].value.x) {
            // still decreasing
            prev_flags.flags[i].new_curve = false;
            prev_flags.flags[i].value.x = parse_res[2 * i    ];
            prev_flags.flags[i].value.y = parse_res[2 * i + 1];
          } else {
            // change direction
            // fork a new array
            prev_flags.flags[i].direction_of_sequence = 0;
            prev_flags.flags[i].new_curve = true;
            prev_flags.flags[i].value_position = prev_flags.total_curves;
            prev_flags.total_curves += 1;
            prev_flags.flags[i].value.x = parse_res[2 * i    ];
            prev_flags.flags[i].value.y = parse_res[2 * i + 1];
          }
        }
      }
      new_flags = prev_flags;

      return new_flags;
    }
  }
}
