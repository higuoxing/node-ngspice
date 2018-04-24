module.exports = {
  plot_option_parser: (plot_option) => {
    // parse plot_option
    let res = { y_label: plot_option.split(' ') };
    return res;
  },
}
