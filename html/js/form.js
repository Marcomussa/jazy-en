const contactForm = document.getElementById("contact-form");
const nameForm = document.getElementById("name-contactForm");
const email = document.getElementById("email-contactForm");
const subject = document.getElementById("subject-contactForm");
const phone = document.getElementById("phone-contactForm");
const message = document.getElementById("text-contactForm");
const submitBTN = document.getElementById("submit-contactSection");

const serviceID = "service_j6s64bb"
const templateID = "template_ziem6h8";

emailjs.init("Pj4IqmhVU1-HUOb1R");

document.addEventListener("DOMContentLoaded", () => {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const response = grecaptcha.getResponse();

    if (response.length === 0) {
      let timerInterval;
      Swal.fire({
        title: "Por favor, completa el reCAPTCHA antes de enviar el formulario.",
        html: "Me cerrare en <b></b> milisegundos",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    } else {
      submitBTN.innerText = "Enviando...";
      submitBTN.setAttribute("data-text", "Enviando...");

      const templateParams = {
        nameForm: nameForm.value,
        email: email.value,
        message: message.value,
        subject: subject.value,
        phone: phone.value
      };

      emailjs.send(serviceID, templateID, templateParams).then(
        function (res) {
          Swal.fire({
            title: "¡El correo electrónico se ha enviado con éxito!",
            text: "En breve nos comunicaremos con usted",
            icon: "success",
            confirmButtonColor: "#18bcc7",
            confirmButtonText: "Listo",
          });

          submitBTN.innerText = "Enviado!";
          submitBTN.setAttribute("data-text", "Enviado!");
        },
        function (err) {
          submitBTN.innerText = "Error";
          submitBTN.setAttribute("data-text", "Error");

          Swal.fire({
            title: "¡Ha ocurrido un error!",
            text: "Contactese con marco@wearealphax.com",
            icon: "error",
            confirmButtonText: "Listo",
          });
        }
      );
    }
  });
});

function enviarEmail() {
  const templateParams = {
    nameForm: nameForm.value,
    email: email.value,
    message: message.value,
    subject: subject.value,
    phone: phone.value
  };

  emailjs.send(serviceID, templateID, templateParams).then(
    function (response) {
      console.log(response);
      alert("¡El correo electrónico se ha enviado con éxito!");

      submitBTN.innerText = "Enviado!";
      submitBTN.setAttribute("data-text", "Enviando...");
    },
    function (error) {
      console.error(error);
      alert(
        "Hubo un error al enviar el correo electrónico. Por favor, inténtalo de nuevo."
      );
    }
  );
}
