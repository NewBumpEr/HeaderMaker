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
    showToast('error', 'Please select a folder before adding headers.');
    return;
  }

  if (!header) {
    showToast('error', 'Please enter a header!');
    return;
  }
  if (fileTypes.length === 0) {
    showToast('error', 'Please select at least one file type!');
    return;
  }

  await window.electron.addHeaders(directoryPath, header, fileTypes);
  showToast('success', 'Headers added successfully!');
});

document.getElementById('remove-headers').addEventListener('click', async () => {
  const header = document.getElementById('header-view').textContent.trim();
  const fileTypes = Array.from(document.getElementById('file-types').querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
  const directoryPath = window.selectedDirectoryPath;

  if (!directoryPath) {
    showToast('error', 'Please select a folder before removing headers.');
    return;
  }

  if (!header) {
    showToast('error', 'Please enter a header!');
    return;
  }
  if (fileTypes.length === 0) {
    showToast('error', 'Please select at least one file type!');
    return;
  }

  await window.electron.removeHeaders(directoryPath, header, fileTypes);
  showToast('success', 'Headers removed successfully!');
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
});

function updateHeaderPreview() {
  const headerText = document.getElementById('header-text').value;
  const fileTypes = Array.from(document.getElementById('file-types').querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
  const headerView = document.getElementById('header-view');

  let formattedHeader = headerText;

  if (fileTypes.includes('.html')) {
    formattedHeader = `<!--\n${headerText.replace(/\n/g, '\n')}\n-->`;
  } else if (fileTypes.includes('.css')) {
    formattedHeader = `/*\n${headerText.replace(/\n/g, '\n')}\n*/`;
  } else {
    formattedHeader = `// ${headerText.replace(/\n/g, '\n// ')}`;
  }

  headerView.textContent = formattedHeader;
}

document.getElementById('header-text').addEventListener('input', updateHeaderPreview);

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
      updateHeaderPreview();
      templateModal.style.display = 'none';
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target === templateModal) {
      templateModal.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const fileTypeCheckboxes = document.querySelectorAll(
    '#file-types input[type="checkbox"]'
  );

  fileTypeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });

  function handleCheckboxChange(event) {
    const selectedValue = event.target.value;

    if (selectedValue === '.html' || selectedValue === '.css') {
      if (event.target.checked) {
        fileTypeCheckboxes.forEach((checkbox) => {
          if (checkbox !== event.target) {
            checkbox.disabled = true;
            checkbox.checked = false;
          }
        });
      } else {
        fileTypeCheckboxes.forEach((checkbox) => {
          checkbox.disabled = false;
        });
      }
    } else {
      const htmlCheckbox = document.querySelector(
        '#file-types input[value=".html"]'
      );
      const cssCheckbox = document.querySelector(
        '#file-types input[value=".css"]'
      );

      if (!htmlCheckbox.checked && !cssCheckbox.checked) {
        fileTypeCheckboxes.forEach((checkbox) => {
          checkbox.disabled = false;
        });
      }
    }

    updateHeaderPreview();
  }
});

function showToast(type, message) {
  const toastContainer = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 500);
  }, 3000);
}
