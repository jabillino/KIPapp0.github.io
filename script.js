// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobile-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")
  const closeIcon = document.getElementById("close-icon")

  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    if (mobileMenu.classList.contains("active")) {
      menuIcon.style.display = "none"
      closeIcon.style.display = "block"
    } else {
      menuIcon.style.display = "block"
      closeIcon.style.display = "none"
    }
  })

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      menuIcon.style.display = "block"
      closeIcon.style.display = "none"
    })
  })
})

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  // Close mobile menu if open
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")
  const closeIcon = document.getElementById("close-icon")

  if (mobileMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active")
    menuIcon.style.display = "block"
    closeIcon.style.display = "none"
  }
}

// Manual section navigation
function showManualSection(sectionId) {
  // Hide all manual sections
  const allSections = document.querySelectorAll(".manual-section-content")
  allSections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show selected section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Update navigation active state
  const allNavItems = document.querySelectorAll(".manual-nav-item")
  allNavItems.forEach((item) => {
    item.classList.remove("active")
  })

  // Find and activate the clicked nav item
  const clickedNavItem = event.target
  clickedNavItem.classList.add("active")
}

// Actualizar la configuración de descargas para manejar MediaFire y otros servicios
const downloadConfig = {
  desktop: {
    windows: {
      url: "https://www.mediafire.com/file/5tclo8mot6ku4nd/kipapp-1.0.2-setup.exe/file",
      directUrl: "https://www.mediafire.com/file/5tclo8mot6ku4nd/kipapp-1.0.2-setup.exe/file", // URL directa si la tienes
      filename: "kipapp-1.0.2-setup.exe",
      size: "90 MB",
      external: true, // Indica que es un enlace externo
    },
    mac: {
      url: "downloads/KIP-App-macOS-v1.0.0.dmg",
      filename: "KIP-App-macOS-v1.0.0.dmg",
      size: "52.1 MB",
    },
    linux: { 
      url: "downloads/KIP-App-Linux-v1.0.0.AppImage",
      filename: "KIP-App-Linux-v1.0.0.AppImage",
      size: "48.7 MB",
    },
  },
  mobile: {
    android: {
      url: "downloads/KIP-App-Android-v1.0.0.apk",
      filename: "KIP-App-Android-v1.0.0.apk",
      size: "25.3 MB",
    },
    ios: {
      url: "https://apps.apple.com/app/kip-app/id123456789",
      external: true,
    },
  },
  manual: {
    url: "downloads/KIP-App-Manual-v1.0.0.pdf",
    filename: "KIP-App-Manual-v1.0.0.pdf",
    size: "2.1 MB",
  },
}

// Actualizar la función downloadDesktop para manejar enlaces externos
function downloadDesktop(platform) {
  const config = downloadConfig.desktop[platform]

  if (!config) {
    alert("Plataforma no soportada")
    return
  }

  // Si es un enlace externo (como MediaFire), abrir en nueva pestaña
  if (config.external) {
    showExternalDownloadModal(config.url, config.filename, config.size, platform)
  } else {
    // Para archivos locales, usar el método original
    if (checkFileExists(config.url)) {
      startDownload(config.url, config.filename, config.size)
    } else {
      alert(`La descarga para ${platform} estará disponible próximamente.\n\nTamaño estimado: ${config.size}`)
    }
  }
}

// Nueva función para mostrar modal de descarga externa
function showExternalDownloadModal(url, filename, size, platform) {
  const modal = document.createElement("div")
  modal.className = "download-modal"
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeDownloadModal()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>Descarga Externa</h3>
        <button class="modal-close" onclick="closeDownloadModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="download-info">
          <div class="file-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </div>
          <div class="file-details">
            <h4>${filename}</h4>
            <p>Tamaño: ${size}</p>
            <p>Plataforma: ${platform.charAt(0).toUpperCase() + platform.slice(1)}</p>
          </div>
        </div>
        <div class="download-instructions">
          <h4>Instrucciones:</h4>
          <ol>
            <li>Se abrirá una nueva pestaña con MediaFire</li>
            <li>Haz clic en el botón azul "DOWNLOAD" en MediaFire</li>
            <li>Espera 5 segundos y la descarga comenzará automáticamente</li>
            <li>Si aparece publicidad, ciérrala y busca el botón de descarga</li>
          </ol>
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline" onclick="closeDownloadModal()">Cancelar</button>
          <button class="btn btn-primary" onclick="proceedToDownload('${url}', '${filename}', '${size}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Ir a MediaFire
          </button>
        </div>
      </div>
    </div>
  `

  // Agregar estilos del modal
  const modalStyles = `
    .download-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease-out;
    }
    
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
    }
    
    .modal-content {
      position: relative;
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 0.75rem;
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.3s ease-out;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #374151;
    }
    
    .modal-header h3 {
      color: white;
      margin: 0;
      font-size: 1.25rem;
    }
    
    .modal-close {
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: color 0.3s;
    }
    
    .modal-close:hover {
      color: white;
    }
    
    .modal-body {
      padding: 1.5rem;
    }
    
    .download-info {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #111827;
      border-radius: 0.5rem;
    }
    
    .file-icon {
      color: #60a5fa;
      flex-shrink: 0;
    }
    
    .file-details h4 {
      color: white;
      margin: 0 0 0.5rem 0;
      font-size: 1.125rem;
    }
    
    .file-details p {
      color: #9ca3af;
      margin: 0.25rem 0;
      font-size: 0.875rem;
    }
    
    .download-instructions {
      margin-bottom: 1.5rem;
    }
    
    .download-instructions h4 {
      color: #34d399;
      margin: 0 0 0.75rem 0;
      font-size: 1rem;
    }
    
    .download-instructions ol {
      color: #d1d5db;
      padding-left: 1.25rem;
      font-size: 0.875rem;
      line-height: 1.6;
    }
    
    .download-instructions li {
      margin-bottom: 0.5rem;
    }
    
    .modal-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 640px) {
      .modal-content {
        width: 95%;
        margin: 1rem;
      }
      
      .modal-actions {
        flex-direction: column;
      }
      
      .download-info {
        flex-direction: column;
        text-align: center;
      }
    }
  `

  // Agregar estilos si no existen
  if (!document.getElementById("modal-styles")) {
    const styleSheet = document.createElement("style")
    styleSheet.id = "modal-styles"
    styleSheet.textContent = modalStyles
    document.head.appendChild(styleSheet)
  }

  document.body.appendChild(modal)
  document.body.style.overflow = "hidden" // Prevenir scroll del body
}

// Función para proceder con la descarga externa
function proceedToDownload(url, filename, size) {
  // Abrir en nueva pestaña
  window.open(url, "_blank", "noopener,noreferrer")

  // Cerrar modal
  closeDownloadModal()

  // Mostrar notificación de seguimiento
  showDownloadNotification(`Redirigiendo a descarga: ${filename}`, size, "external")

  // Track download
  trackDownload("external", filename)
}

// Función para cerrar el modal
function closeDownloadModal() {
  const modal = document.querySelector(".download-modal")
  if (modal) {
    modal.style.animation = "fadeOut 0.3s ease-in"
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal)
      }
      document.body.style.overflow = "" // Restaurar scroll del body
    }, 300)
  }
}

// Actualizar la función showDownloadNotification para manejar descargas externas
function showDownloadNotification(filename, size, type = "direct") {
  const notification = document.createElement("div")
  notification.className = "download-notification"

  const iconSvg =
    type === "external"
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
         <polyline points="15,3 21,3 21,9"></polyline>
         <line x1="10" y1="14" x2="21" y2="3"></line>
       </svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
         <polyline points="7,10 12,15 17,10"></polyline>
         <line x1="12" y1="15" x2="12" y2="3"></line>
       </svg>`

  const titleText = type === "external" ? "Redirigiendo a descarga" : "Descarga iniciada"

  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        ${iconSvg}
      </div>
      <div class="notification-text">
        <h4>${titleText}</h4>
        <p>${filename} (${size})</p>
      </div>
      <button class="notification-close" onclick="closeNotification(this)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `

  // Resto del código de notificación permanece igual...
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1f2937;
    border: 1px solid #374151;
    border-radius: 0.5rem;
    padding: 1rem;
    color: white;
    z-index: 1000;
    min-width: 300px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentNode) {
      closeNotification(notification.querySelector(".notification-close"))
    }
  }, 5000)
}

// Check if file exists (simplified check)
function checkFileExists(url) {
  // Para URLs externas, siempre retornar true
  if (url.includes("mediafire.com") || url.includes("drive.google.com") || url.includes("dropbox.com")) {
    return true
  }
  // Para archivos locales, cambiar a true cuando tengas los archivos
  return false
}

// Start download with progress indication
function startDownload(url, filename, size) {
  // Create download link
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.style.display = "none"

  // Add to DOM and trigger download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Show download notification
  showDownloadNotification(filename, size)
}

// Show download notification
// function showDownloadNotification(filename, size) {
//   // Create notification element
//   const notification = document.createElement("div")
//   notification.className = "download-notification"
//   notification.innerHTML = `
//     <div class="notification-content">
//       <div class="notification-icon">
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//           <polyline points="7,10 12,15 17,10"></polyline>
//           <line x1="12" y1="15" x2="12" y2="3"></line>
//         </svg>
//       </div>
//       <div class="notification-text">
//         <h4>Descarga iniciada</h4>
//         <p>${filename} (${size})</p>
//       </div>
//       <button class="notification-close" onclick="closeNotification(this)">
//         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//           <line x1="18" y1="6" x2="6" y2="18"></line>
//           <line x1="6" y1="6" x2="18" y2="18"></line>
//         </svg>
//       </button>
//     </div>
//   `

//   // Add styles
//   notification.style.cssText = `
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     background: #1f2937;
//     border: 1px solid #374151;
//     border-radius: 0.5rem;
//     padding: 1rem;
//     color: white;
//     z-index: 1000;
//     min-width: 300px;
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
//     animation: slideIn 0.3s ease-out;
//   `

//   // Add animation styles
//   const style = document.createElement("style")
//   style.textContent = `
//     @keyframes slideIn {
//       from {
//         transform: translateX(100%);
//         opacity: 0;
//       }
//       to {
//         transform: translateX(0);
//         opacity: 1;
//       }
//     }
//     .notification-content {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//     }
//     .notification-icon {
//       color: #34d399;
//     }
//     .notification-text h4 {
//       margin: 0 0 0.25rem 0;
//       font-size: 0.875rem;
//       font-weight: 600;
//     }
//     .notification-text p {
//       margin: 0;
//       font-size: 0.75rem;
//       color: #9ca3af;
//     }
//     .notification-close {
//       background: none;
//       border: none;
//       color: #9ca3af;
//       cursor: pointer;
//       padding: 0.25rem;
//       margin-left: auto;
//     }
//     .notification-close:hover {
//       color: white;
//     }
//   `
//   document.head.appendChild(style)

//   // Add to DOM
//   document.body.appendChild(notification)

//   // Auto remove after 5 seconds
//   setTimeout(() => {
//     if (notification.parentNode) {
//       closeNotification(notification.querySelector(".notification-close"))
//     }
//   }, 5000)
// }

// Close notification
function closeNotification(button) {
  const notification = button.closest(".download-notification") || button
  if (notification && notification.parentNode) {
    notification.style.animation = "slideOut 0.3s ease-in"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }
}

// Add slideOut animation
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style")
  style.textContent += `
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
})

// Agregar animación fadeOut para el modal
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style")
  style.textContent += `
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".screenshot-card, .info-card, .team-card, .download-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(17, 24, 39, 0.95)"
  } else {
    navbar.style.background = "rgba(17, 24, 39, 0.8)"
  }
})

// Add loading states to buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add a subtle loading effect
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })
})

// Keyboard navigation for manual sections
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    const activeNavItem = document.querySelector(".manual-nav-item.active")
    if (activeNavItem) {
      const navItems = Array.from(document.querySelectorAll(".manual-nav-item"))
      const currentIndex = navItems.indexOf(activeNavItem)

      let nextIndex
      if (e.key === "ArrowUp") {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1
      } else {
        nextIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0
      }

      navItems[nextIndex].click()
      e.preventDefault()
    }
  }
})

// Add smooth hover effects
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".screenshot-card, .info-card, .team-card, .download-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})

// Download analytics (optional)
function trackDownload(platform, type) {
  // Here you could add analytics tracking
  console.log(`Download tracked: ${type} - ${platform}`)

  // Example: Google Analytics event
  // gtag('event', 'download', {
  //   'event_category': 'engagement',
  //   'event_label': `${type}-${platform}`
  // });
}

// File size formatter
function formatFileSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB"]
  if (bytes === 0) return "0 Bytes"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
}

// Update download status dynamically
function updateDownloadStatus() {
  // This could check server status and update availability
  const desktopStatus = document.getElementById("desktop-status")
  const mobileStatus = document.getElementById("mobile-status")

  // Example status updates
  if (desktopStatus) {
    desktopStatus.textContent = "Disponible"
    desktopStatus.style.color = "#34d399"
  }

  if (mobileStatus) {
    mobileStatus.textContent = "Próximamente"
    mobileStatus.style.color = "#f59e0b"
  }
}

// Initialize status on page load
document.addEventListener("DOMContentLoaded", updateDownloadStatus)
