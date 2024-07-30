document.addEventListener('DOMContentLoaded', () => {
  const helpButton = document.getElementById('help-button');
  const modal = document.getElementById('info-modal');
  const closeModalButton = modal.querySelector('.close-modal');

  helpButton.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const helpButton = document.getElementById('help-btn');
  const modal = document.getElementById('help-modal');
  const closeModalButton = modal.querySelector('.close-modal');

  helpButton.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

document.getElementById('select-directory').addEventListener('click', async () => {
  const directoryPath = await window.electron.selectDirectory();
  if (directoryPath) {
    document.getElementById('selected-directory').textContent = `Selected Folder: ${directoryPath}`;
    window.selectedDirectoryPath = directoryPath;

    document.getElementById('header-options').style.display = 'block';

    document.getElementById('select-directory').style.display = 'none';
  }
});

document.getElementById('add-headers').addEventListener('click', async () => {
  const header = document.getElementById('header-view').textContent.trim();
  const fileTypes = Array.from(document.getElementById('file-types').querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
  const directoryPath = window.selectedDirectoryPath;

  if (!directoryPath) {
    document.getElementById('status_error').textContent = 'Please select a folder before adding headers.';
    return;
  }

  if (!header) {
    document.getElementById('status_error').textContent = 'Please enter a header!';
    return;
  }
  if (fileTypes.length === 0) {
    document.getElementById('status_error').textContent = 'Please select at least one file type!';
    return;
  }

  await window.electron.addHeaders(directoryPath, header, fileTypes);
  document.getElementById('status_successfully').textContent = 'Headers added successfully!';
  document.getElementById('status_error').textContent = '';
});

document.getElementById('remove-headers').addEventListener('click', async () => {
  const header = document.getElementById('header-view').textContent.trim();
  const fileTypes = Array.from(document.getElementById('file-types').querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
  const directoryPath = window.selectedDirectoryPath;

  if (!directoryPath) {
    document.getElementById('status_error').textContent = 'Please select a folder before removing headers.';
    return;
  }

  if (!header) {
    document.getElementById('status_error').textContent = 'Please enter a header!';
    return;
  }
  if (fileTypes.length === 0) {
    document.getElementById('status_error').textContent = 'Please select at least one file type!';
    return;
  }

  await window.electron.removeHeaders(directoryPath, header, fileTypes);
  document.getElementById('status_successfully').textContent = 'Headers removed successfully!';
  document.getElementById('status_error').textContent = '';
});

document.getElementById('back-to-menu').addEventListener('click', () => {
  document.getElementById('header-options').style.display = 'none';
  document.getElementById('select-directory').style.display = 'block';

  document.getElementById('selected-directory').textContent = '';
  window.selectedDirectoryPath = null;

  document.getElementById('header-text').value = '';
  document.getElementById('header-view').textContent = '';

  document.getElementById('file-types').querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    checkbox.checked = false;
  });

  document.getElementById('status_successfully').textContent = '';
  document.getElementById('status_error').textContent = '';
});

document.getElementById('header-text').addEventListener('input', () => {
  const headerText = document.getElementById('header-text').value;

  const formattedHeader = `// ${headerText.replace(/\n/g, '\n// ')} `;

  document.getElementById('header-view').textContent = formattedHeader;
});

document.addEventListener('DOMContentLoaded', () => {
  const openTemplateModalButton = document.getElementById('open-template-modal');
  const templateModal = document.getElementById('template-modal');
  const closeModalButton = document.querySelector('.close-modal');
  const templates = document.querySelectorAll('.template-item');
  const headerTextArea = document.getElementById('header-text');
  const headerView = document.getElementById('header-view');

  openTemplateModalButton.addEventListener('click', () => {
    templateModal.style.display = 'flex';
  });

  closeModalButton.addEventListener('click', () => {
    templateModal.style.display = 'none';
  });

  templates.forEach(template => {
    template.addEventListener('click', () => {
      const templateContent = template.querySelector('.template-description').getAttribute('data-template');
      headerTextArea.value = templateContent;
      headerView.textContent = `// ${templateContent.replace(/\n/g, '\n// ')} `;
      templateModal.style.display = 'none';
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target === templateModal) {
      templateModal.style.display = 'none';
    }
  });
});
