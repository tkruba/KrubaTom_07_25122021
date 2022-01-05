exports.login = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: "Connexion réussie."
    });
}

exports.register = (req, res, next) => {
    if (req.body.firstname &&
        req.body.surname &&
        req.body.email &&
        req.body.password &&
        req.body.passwordConfirm) {

        let nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (nameRegex.test(req.body.firstname) &&
            nameRegex.test(req.body.surname) &&
            emailRegex.test(req.body.email)) {

            let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*.?])(?=.*[0-9])(?=.*[a-z]).{7,15}/u;

            if (passwordRegex.test(req.body.password) &&
                req.body.passwordConfirm === req.body.password) {

                    // if (!email.exist(bdd))
                res.status(200).json({
                    message: "Enregistrement réussi."
                });
            } else {
                res.status(415).send(new Error('Données de Mot de passe non conforme'));
            }
        } else {
            res.status(415).send(new Error('Données JSON non conforme.'));
        }
    } else {
        // 400 Bad Request || 406 Not Acceptable ?
        res.status(400).send(new Error('JSON non valide'));
    }
    console.log(req.body);
}