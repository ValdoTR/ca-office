/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

let currentZone: string;
let currentPopup: any = undefined;

const config = [
    {
        zone: 'needHelp',
        message: 'Avez-vous besoin d\'aide ? Nous serons ravis de vous aider.',
        cta: [
            {
                label: 'Rejoindre',
                className: 'primary',
                callback: () => WA.nav.openTab('https://play.staging.workadventu.re/@/tcm/workadventure/wa-village'),
            }
        ]
    },
    {
        zone: 'joystickTetris',
        message: 'Jouez en solo. Votre partie n\'est pas partagée.',
        cta: []
    },
      {
        zone: 'joystickPong',
        message: 'Jouez en solo. Votre partie n\'est pas partagée.',
        cta: []
    },
    {
        zone: 'joystickGartic',
        message: 'Pour jouer entre vous, entrez le même nom de "room" puis lancez la partie !',
        cta: []
    },
]

WA.room.onEnterZone('needHelp', () => {
    currentZone = 'needHelp'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.room.onEnterZone('followUs', () => {
    currentZone = 'followUs'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.room.onEnterLayer('joystickTetris').subscribe(() => {
    currentZone = 'joystickTetris'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.room.onEnterLayer('joystickPong').subscribe(() => {
    currentZone = 'joystickPong'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.room.onEnterLayer('joystickGartic').subscribe(() => {
    currentZone = 'joystickGartic'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.room.onLeaveZone('needHelp', closePopup);
WA.room.onLeaveZone('followUs', closePopup);
WA.room.onLeaveLayer('joystickTetris').subscribe(closePopup);
WA.room.onLeaveLayer('joystickPong').subscribe(closePopup);
WA.room.onLeaveLayer('joystickGartic').subscribe(closePopup);



function openPopup(zoneName: string, popupName: string) {
    const zone = config.find((item) => {
        return item.zone == zoneName
    });
    if (typeof zone !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
