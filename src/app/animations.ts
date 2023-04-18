import { animate, style, transition, trigger } from '@angular/animations';

const translateXMin100 = 'translateX(-100%)'
const translateX0 = 'translateX(0%)'

export const panelAnimation =
  trigger('panelInOut', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate(500)
    ]),
    transition('* => void', [
      animate(500),
      style({ opacity: 0 })
    ])
  ]);

export const slideInAnimation = [panelAnimation,
  trigger(
    'leftRightAnimation',
    [
      transition(
        ':enter',
        [
          style({ transform: translateXMin100, width: '*', opacity: 0 }),
          animate('0.3s ease-in',
            style({ transform: translateX0, width: '*', opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ transform: translateX0, width: '*', opacity: 1}),
          animate('0.3s ease-out',
            style({ transform: translateXMin100, width: '*', opacity: 0 }))
        ]
      )
    ]
  )
];
