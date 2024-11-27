class MainView {
    constructor() {
        this.diskListContainer = document.getElementById('disk-list');
        this.addDiskForm = document.getElementById('add-disk-form');
        this.searchInput = document.getElementById('search-input');
    }

    displayDisks(disks) {
        this.diskListContainer.innerHTML = disks.map(disk => `
            <div class="disk-item">
                <img src="${disk.cover}" alt="${disk.title}" />
                <h3>${disk.title} (${disk.releaseYear})</h3>
                <p>Artist: ${disk.artist ? disk.artist.name : 'Unknown'}</p>
                <p>Genres: ${disk.genres.map(genre => genre.name).join(', ')}</p>
                <button data-title="${disk.title}" class="delete-disk">Delete</button>
            </div>
        `).join('');
    }

    bindShowDetails(handler) {
        document.getElementById('disk-list').addEventListener('click', event => {
            if (event.target.classList.contains('show-details')) {
                const title = event.target.dataset.title;
                handler(title);
            }
        });
    }

    bindDeleteDisk(handler) {
        document.getElementById('disk-list').addEventListener('click', event => {
            if (event.target.classList.contains('delete-button')) {
                const title = event.target.dataset.title;
                handler(title);
            }
        });
    }


    bindShowDetails(handler) {
        document.getElementById('disk-list').addEventListener('click', event => {
            if (event.target.classList.contains('show-details')) {
                const title = event.target.dataset.title;
                handler(title);
            }
        });
    }


    bindAddDisk(handler) {
        this.addDiskForm.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(this.addDiskForm);
            const newDisk = {
                title: formData.get('title'),
                releaseYear: formData.get('releaseYear'),
                cover: formData.get('cover'),
                tracks: formData.get('tracks').split(','),
                genres: formData.get('genres').split(',').map(genre => ({ name: genre }))
            };
            handler(newDisk);
        });
    }

    bindDeleteDisk(handler) {
        this.diskListContainer.addEventListener('click', event => {
            if (event.target.className === 'delete-disk') {
                const title = event.target.dataset.title;
                handler(title);
            }
        });
    }
}

export default MainView;
