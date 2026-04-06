export interface BodyPartModel {
    name: string;
    displayName: string;
    view: 'front' | 'back';
    svgPath: string; // SVG path definition for clickable region
}

export const BODY_PARTS: BodyPartModel[] = [
    // Front view
    { name: 'head', displayName: 'Cabeza', view: 'front', svgPath: 'M150,30 L170,30 L180,50 L170,70 L150,70 L140,50 Z' },
    { name: 'neck', displayName: 'Cuello', view: 'front', svgPath: 'M145,70 L175,70 L175,90 L145,90 Z' },
    { name: 'chest', displayName: 'Pecho', view: 'front', svgPath: 'M120,90 L200,90 L200,160 L120,160 Z' },
    { name: 'abdomen', displayName: 'Abdomen', view: 'front', svgPath: 'M125,160 L195,160 L195,230 L125,230 Z' },
    { name: 'left_arm_upper', displayName: 'Brazo Izquierdo Superior', view: 'front', svgPath: 'M200,90 L240,100 L240,160 L200,160 Z' },
    { name: 'right_arm_upper', displayName: 'Brazo Derecho Superior', view: 'front', svgPath: 'M80,100 L120,90 L120,160 L80,160 Z' },
    { name: 'left_arm_lower', displayName: 'Antebrazo Izquierdo', view: 'front', svgPath: 'M200,160 L240,160 L240,230 L200,230 Z' },
    { name: 'right_arm_lower', displayName: 'Antebrazo Derecho', view: 'front', svgPath: 'M80,160 L120,160 L120,230 L80,230 Z' },
    { name: 'left_hand', displayName: 'Mano Izquierda', view: 'front', svgPath: 'M200,230 L240,230 L240,260 L200,260 Z' },
    { name: 'right_hand', displayName: 'Mano Derecha', view: 'front', svgPath: 'M80,230 L120,230 L120,260 L80,260 Z' },
    { name: 'left_leg_upper', displayName: 'Muslo Izquierdo', view: 'front', svgPath: 'M160,230 L190,230 L190,320 L160,320 Z' },
    { name: 'right_leg_upper', displayName: 'Muslo Derecho', view: 'front', svgPath: 'M130,230 L160,230 L160,320 L130,320 Z' },
    { name: 'left_leg_lower', displayName: 'Pierna Izquierda', view: 'front', svgPath: 'M160,320 L190,320 L190,410 L160,410 Z' },
    { name: 'right_leg_lower', displayName: 'Pierna Derecha', view: 'front', svgPath: 'M130,320 L160,320 L160,410 L130,410 Z' },
    { name: 'left_foot', displayName: 'Pie Izquierdo', view: 'front', svgPath: 'M160,410 L190,410 L200,430 L160,430 Z' },
    { name: 'right_foot', displayName: 'Pie Derecho', view: 'front', svgPath: 'M130,410 L160,410 L160,430 L120,430 Z' },

    // Back view
    { name: 'head_back', displayName: 'Cabeza (Posterior)', view: 'back', svgPath: 'M150,30 L170,30 L180,50 L170,70 L150,70 L140,50 Z' },
    { name: 'neck_back', displayName: 'Cuello (Posterior)', view: 'back', svgPath: 'M145,70 L175,70 L175,90 L145,90 Z' },
    { name: 'upper_back', displayName: 'Espalda Superior', view: 'back', svgPath: 'M120,90 L200,90 L200,160 L120,160 Z' },
    { name: 'lower_back', displayName: 'Espalda Inferior', view: 'back', svgPath: 'M125,160 L195,160 L195,230 L125,230 Z' },
    { name: 'left_arm_upper_back', displayName: 'Brazo Izquierdo Superior (Posterior)', view: 'back', svgPath: 'M200,90 L240,100 L240,160 L200,160 Z' },
    { name: 'right_arm_upper_back', displayName: 'Brazo Derecho Superior (Posterior)', view: 'back', svgPath: 'M80,100 L120,90 L120,160 L80,160 Z' },
    { name: 'left_arm_lower_back', displayName: 'Antebrazo Izquierdo (Posterior)', view: 'back', svgPath: 'M200,160 L240,160 L240,230 L200,230 Z' },
    { name: 'right_arm_lower_back', displayName: 'Antebrazo Derecho (Posterior)', view: 'back', svgPath: 'M80,160 L120,160 L120,230 L80,230 Z' },
    { name: 'left_leg_upper_back', displayName: 'Muslo Izquierdo (Posterior)', view: 'back', svgPath: 'M160,230 L190,230 L190,320 L160,320 Z' },
    { name: 'right_leg_upper_back', displayName: 'Muslo Derecho (Posterior)', view: 'back', svgPath: 'M130,230 L160,230 L160,320 L130,320 Z' },
    { name: 'left_leg_lower_back', displayName: 'Pierna Izquierda (Posterior)', view: 'back', svgPath: 'M160,320 L190,320 L190,410 L160,410 Z' },
    { name: 'right_leg_lower_back', displayName: 'Pierna Derecha (Posterior)', view: 'back', svgPath: 'M130,320 L160,320 L160,410 L130,410 Z' }
];
