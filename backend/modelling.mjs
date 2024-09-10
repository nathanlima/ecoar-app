// modelling.mjs
import { Model } from "simulation";

export function runSimulation() {
    let m = new Model({
        timeStart: 0,
        timeLength: 20,
        timeUnits: "Months"
    });

    // Start with 100 in the "patrimonio" stock
    let patrimonio = m.Stock({
        name: "Patrimonio",
        initial: 100
    });

    // Use a net growth rate of 1% a month
    let taxa = m.Variable({
        name: "Taxa",
        value: 0.01
    });

    // The growth each period is the value of patrimonio times the growth rate
    let incremento = m.Flow(null, patrimonio, {
        rate: "[Patrimonio] * [Taxa]"
    });

    // Link the taxa and incremento so that the flow references the rate
    m.Link(taxa, incremento);

    // Run the simulation
    return m.simulate();
}