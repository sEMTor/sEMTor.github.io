
var $ = function (id) { return document.getElementById(id); };

const params = {
  general: {
    t_end: 48,
    dt: 0.1,
    random_seed: 0,
    N_init: 59,
    N_max: 80,
    N_emt: 19,
    w_init: 60,  // ~ N_init * 1.5
    h_init: 5,
    mu: 0.2,
    n_substeps: 30,
    alg_dt: 0.01,
    w_screen: 70,
    h_screen: 70 * 1/5, 
    p_div_out: 0.95,  // cp. NC
  },
  cell_prop: {
    apical_junction_init: 1.5,
    max_basal_junction_dist: 1.0,
    basal_daming_ratio: 1.0,
    cytos_init: 1.5,
    diffusion: 0.1,

  },
  cell_types: {
    control: {
      name: 'control',
      R_hard: 0.4,
      R_hard_div: 0.7,
      R_soft: 1.2,
      color: { r: 30, g: 100, b: 20 },
      dur_G2: 0.5,
      dur_mitosis: 0.5,
      k_apical_junction: 1.0,
      k_cytos: 5.0,
      max_cytoskeleton_length: 3.7,
      run: 0.0,
      running_speed: 1.0,
      running_mode: 0,
      stiffness_apical_apical: 2.0,
      stiffness_apical_apical_div: 4.0,
      stiffness_nuclei_apical: 3.0,
      stiffness_nuclei_basal: 2.0,
      stiffness_repulsion: 4.0,
      stiffness_straightness: 15.0,
      lifespan: { min: 5.5, max: 6.5 },
      INM: 1.0,
      hetero: false,
      events: {
        time_A: { min: Infinity, max: Infinity},
        time_B: { min: Infinity, max: Infinity},
        time_S: { min: Infinity, max: Infinity},
        time_P: { min: Infinity, max: Infinity },
      }
    },
    emt: {
      name: 'emt',
      R_hard: 0.4,
      R_hard_div: 0.7,
      R_soft: 1.2,
      color: {r: 128, g: 0, b: 128},
      dur_G2: 0.5,
      dur_mitosis: 0.5,
      k_apical_junction: 1.0,
      k_cytos: 5.0,
      max_cytoskeleton_length: 3.7,
      run: 0.0,
      running_speed: 1.0,
      running_mode: 0,
      stiffness_apical_apical: 2.0,
      stiffness_apical_apical_div: 4.0,
      stiffness_nuclei_apical: 3.0,
      stiffness_nuclei_basal: 2.0,
      stiffness_repulsion: 4.0,
      stiffness_straightness: 15.0,
      lifespan: { min: 5.5, max: 6.5 },
      INM: 0.0,
      hetero: false,
      events: {
        time_A: { min: Infinity, max: Infinity },
        time_B: { min: 6, max: 24 },
        time_S: { min: Infinity, max: Infinity },
        time_P: { min: Infinity, max: Infinity },
      }
    }
  }
}

function init_display(s) {
    const pg = params.general;
    const emt = params.cell_types.emt;  

    function update_label(t, el) {
      if( t < pg.t_end && !emt.hetero )
        el.style = "left: " + String(t / pg.t_end * 100) + "%";
    else
        el.style = "display: none;"
    } 

    update_label(emt.events.time_A.min, p_A);
    update_label(emt.events.time_B.min, p_B);
    update_label(emt.events.time_S.min, p_S);

    if( emt.run > 0 )
        p_B.innerHTML  = "B(p)"
    else
        p_B.innerHTML  = "B"

    p_sim_end.style = "display:none;"

}

const p_time = $("time");
const p_prog = $("progress_bar");
const p_A = $("A_time");
const p_B = $("B_time");
const p_S = $("S_time");
const p_sim_end = $("sim_end");
const p_info = $("timing_table");

function update_display(p, s) {
    const pg = params.general;
    p_time.innerHTML = "" + String(s.t.toFixed(1)) + "h"; 
    p_prog.style = "width: " + String(s.t / params.general.t_end * 100) + "%";

    if( s.cells.length == params.general.N_max) {
         p.fill(0,0,0);
         p.text("Maximal number of cells reached. Cell division inactive.", -pg.w_screen/2 + 4, 0.2*pg.h_screen);
    }

    if( s.t > pg.t_end ) {
      p_sim_end.style = "display:block;"
    }
};

let inputs = {
  params: params,
  init_display: init_display,
  update_display: update_display,
  screen_size: { w: 1000.0, h: 200.0 }
};

let sim_emt_p5 = new p5(p => sim_emt(p, inputs, $('sim_div')), 'sim_div');

// pcontrol.run = false;
// pcontrol.INM = true;
// pcontrol.A = 9;
// pcontrol.B = 15;
// pcontrol.S = 21;
// pcontrol.N = 11;

function controlFromHtml() {

  const pg = params.general;
  const emt = params.cell_types.emt;

  let hetero = $("hetero_input").checked;

  if (hetero) {
    pg.N_emt = 11;
    pg.N_init = pg.N_emt + 35;

    emt.INM = parseFloat($("INM_input_hetero").value) / 2.0
    emt.run = parseFloat($("run_input_hetero").value) / 2.0
    emt.hetero = true;

    emt.events.time_A = {min: 6, max: 24};
    emt.events.time_B = {min: 6, max: 24};
    emt.events.time_S = {min: 6, max: 24};
    emt.events.time_P = {min: 6, max: 24};

    // timings are always the same rage: 
  }
  else {
    let N_cases = parseInt($("N_input").value);
    if (N_cases == 0) {
      pg.N_emt = 0;
    } else if (N_cases == 1) {
      pg.N_emt = 1;
    } else {
      pg.N_emt = 11;
    }
    pg.N_init = pg.N_emt + 35;

    emt.INM = $("INM_input_homo").checked ? 1.0 : 0.0;
    emt.run = $("run_input_homo").checked ? 1.0 : 0.0;

    const emt_sc = $("EMT_scenario");
    var emt_times = JSON.parse(emt_sc.options[emt_sc.selectedIndex].value);
    // replace in emt_times = 0 with Infinity
    for (let i = 0; i < emt_times.length; i++) {
      if (emt_times[i] == 0) {
        emt_times[i] = Infinity;
      }
    }

    let A = emt_times[0];
    let B = emt_times[1];
    let S = emt_times[2];
    let P = B;

    emt.events.time_A = {min: A, max: A+0.05};
    emt.events.time_B = {min: B, max: B+0.05};
    emt.events.time_S = {min: S, max: S+0.05};
    emt.events.time_B = {min: P, max: P+0.05};
  }

  sim_emt_p5.init();
}

// controlFromHtml();

// when run_button is pressed, call sim_emt.init()
$("run_button").addEventListener("click", function () {
  sim_emt_p5.init();
});

$("play_button").addEventListener("click", function () {
  sim_emt_p5.pause();
});
