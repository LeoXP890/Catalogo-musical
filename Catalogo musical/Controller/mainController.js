import Disk from "../Model/disk.js";
import Artist from "../model/Artist.js";
import Genre from "../model/Genre.js";
import MainView from "../view/mainview.js";

document.getElementById('show-catalog').addEventListener('click', () => {
    const output = document.getElementById('catalog-output');
    output.innerHTML = this.disks.map(disk => `
        <p>${disk.title} - ${disk.releaseYear}</p>
    `).join('');
});


class MainController {

    

    handleSearch(query) {
        // Filtrar a lista de discos com base no termo de busca
        const filteredDisks = this.disks.filter(disk =>
            disk.title.toLowerCase().includes(query.toLowerCase()) ||
            disk.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
        );
        this.view.displayDisks(filteredDisks);
    }

    handleShowDetails(title) {
        const disk = this.disks.find(d => d.title === title);
        if (disk) {
            const detailsContent = document.getElementById('details-content');
            detailsContent.innerHTML = `
            <img src="${disk.cover}" alt="Capa do Disco">
            <h3>${disk.title}</h3>
            <p>Ano: ${disk.releaseYear}</p>
            <p>Gêneros: ${disk.genres.join(', ')}</p>
            <p>Faixas: ${disk.tracks.join(', ')}</p>
        `;
            document.getElementById('disk-details').style.display = 'block';
        }
    }

    handleDeleteDisk(title) {
        this.disks = this.disks.filter(disk => disk.title !== title);
        localStorage.setItem('disks', JSON.stringify(this.disks)); // Se estiver usando localStorage
        this.view.displayDisks(this.disks);
    }



    // Vincular o evento de busca
    bindSearch() {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            this.handleSearch(query);
        });
    }

    constructor() {
        this.disks = JSON.parse(localStorage.getItem('disks')) || [];
        this.view = new MainView();

        this.view.bindAddDisk(this.handleAddDisk.bind(this));
        this.view.bindDeleteDisk(this.handleDeleteDisk.bind(this));
        this.view.bindShowDetails(this.handleShowDetails.bind(this));
        this.bindSearch();

        this.view.displayDisks(this.disks);
    }



    constructor() {
        this.disks = JSON.parse(localStorage.getItem('disks')) || [];
        this.view = new MainView();

        this.view.bindAddDisk(this.handleAddDisk.bind(this));
        this.view.bindDeleteDisk(this.handleDeleteDisk.bind(this));
        this.view.displayDisks(this.disks);
    }

    handleAddDisk(newDiskData) {
        const newDisk = new Disk(
            newDiskData.title,
            newDiskData.releaseYear,
            newDiskData.cover,
            newDiskData.tracks,
            newDiskData.genres
        );
        this.disks.push(newDisk);
        localStorage.setItem('disks', JSON.stringify(this.disks));
        this.view.displayDisks(this.disks);
    }

    handleDeleteDisk(title) {
        this.disks = this.disks.filter(disk => disk.title !== title);
        localStorage.setItem('disks', JSON.stringify(this.disks));
        this.view.displayDisks(this.disks);
    }
    bindSearch(handler) {
        this.searchInput.addEventListener('input', event => {
            const query = event.target.value;
            handler(query);
        });
    }




    handleSearch(query) {
        const filteredDisks = this.disks.filter(disk =>
            disk.title.toLowerCase().includes(query.toLowerCase()) ||
            disk.artist?.name.toLowerCase().includes(query.toLowerCase()) ||
            disk.genres.some(genre => genre.name.toLowerCase().includes(query.toLowerCase()))
        );
        this.view.displayDisks(filteredDisks);
    }


}


