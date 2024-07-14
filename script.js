// Fonction pour charger les données JSON depuis un fichier
async function loadProjects() {
  try {
    const response = await fetch('projects.json');
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error);
  }
}

// Fonction pour afficher les projets
function displayProjects(projects) {
  const projectContainer = document.getElementById('project-container');

  // Ajouter la modale HTML
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal', 'fade');
  modalContainer.id = 'projectModal';
  modalContainer.tabIndex = '-1';
  modalContainer.setAttribute('aria-labelledby', 'projectModalLabel');
  modalContainer.setAttribute('aria-hidden', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  const modalTitle = document.createElement('h5');
  modalTitle.classList.add('modal-title');
  modalTitle.id = 'projectModalLabel';

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('btn', 'btn-secondary');
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.textContent = 'Fermer';

  modalHeader.appendChild(modalTitle);
  modalBody.appendChild(modalFooter);
  modalFooter.appendChild(closeButton);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modalContainer.appendChild(modalDialog);
  document.body.appendChild(modalContainer);

  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('col-md-4', 'mb-4');

    const projectCard = document.createElement('div');
    projectCard.classList.add('card');

    // Contenu modale
    const img = document.createElement('img');
    img.src = project.src;
    img.alt = project.title;
    img.classList.add('card-img-top');
    img.addEventListener('click', () => {
      modalTitle.textContent = project.title;
      modalBody.innerHTML = `
        <p>${project.description}</p>
        <p>${project.difficultes}</p>
        <p>${project.competences}</p>
        <a href="${project.link}" class="btn btn-primary">Lien Github</a>
      `;
      const modal = new bootstrap.Modal(modalContainer);
      modal.show();
    });

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = project.title;

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = project.description;

    const difficultes = document.createElement('p');
    difficultes.classList.add('card-text');
    difficultes.textContent = project.difficultes;

    const link = document.createElement('a');
    link.href = project.link;

    cardBody.appendChild(title);

    projectCard.appendChild(img);
    projectCard.appendChild(cardBody);

    projectElement.appendChild(projectCard);
    projectContainer.appendChild(projectElement);
  });
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', loadProjects);