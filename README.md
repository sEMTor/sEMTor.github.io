# sEMTor.github.io

sEMTor is an online simulation for epithelial-mesenchymal transitions (EMT): [sEMTtor.github.io](https://semtor.github.io/)

See the companion articles:

- **S. Plunder, C. Danesin, B. Glise, M. A. Ferreira, S. Merino-Aceituno, E. Theveneau**, _Modelling variability and heterogeneity of EMT scenarios highlights nuclear positioning and protrusions as main drivers of extrusion._ **(2023)** [bioRxiv](https://www.biorxiv.org/content/10.1101/2023.11.17.567510v1).

- **E. Despin-Guitard, V. Rosa, S. Plunder, N. Mathiah, M. Shahbazi, E. Theveneau, K. Van Shoor, E. Nehme, S. Merino-Aceituno, J. Egea, I. Migeotte** _Occurrence of non-apical mitoses at the primitive streak, induced by relaxation of actomyosin and acceleration of the cell cycle, contributes to cell delamination during mouse gastrulation._ **(2024)** [bioRxiv](https://www.biorxiv.org/content/10.1101/2024.01.24.577096v1).


## Source code

The primary simulation is implemented in the file
[page/js/simulation.js](https://github.com/sEMTor/sEMTor.github.io/blob/main/page/js/simulation.js).

See also [sEMTor.jl](https://github.com/SteffenPL/sEMTor.jl) for the Julia implementation, which can be executed for free in this [Code Ocean Capsule](https://codeocean.com/capsule/7746744/tree). 

## Local deployment

To make changes to the simulation, install [Node.js](https://github.com/nvm-sh/nvm) and run the command
`npm install` and `npm run start` in the root folder of this project.
