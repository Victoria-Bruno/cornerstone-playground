import {
  IStackViewport,
  IVolumeViewport,
  Point3,
} from '@cornerstonejs/core/dist/esm/types'

import { Annotation } from '@cornerstonejs/tools/dist/esm/types'
import { uuidv4 } from '@cornerstonejs/core/dist/esm/utilities'

/**
 * Create an annotation
 *
 * @param viewport - the target stack/volume viewport
 * @param coordinates
 * @param toolName - an added tool in toolGroup
 * @returns
 */
export default function createAnnotationHelper(
  viewport: IStackViewport | IVolumeViewport,
  coordinates: Point3[],
  toolName: string
) {
  const annotation: Annotation = {
    annotationUID: uuidv4(),
    isVisible: true,
    highlighted: true,
    data: {
      handles: {
        // x,y,z point
        points: coordinates,
        activeHandleIndex: null,
        textBox: {
          hasMoved: false,
          worldPosition: [-25.891878128051758, 50.000213623046875, -206.5],
          worldBoundingBox: {
            topLeft: coordinates[0],
            topRight: coordinates[1],
            bottomLeft: coordinates[2],
            bottomRight: coordinates[3],
          },
        },
      },
      label: '',
    },
    metadata: {
      FrameOfReferenceUID: viewport.getFrameOfReferenceUID(),
      referencedImageId: viewport.getCurrentImageId(),
      toolName,
      viewPlaneNormal: viewport.getCamera().viewPlaneNormal,
      viewUp: viewport.getCamera().viewUp,
      cameraFocalPoint: viewport.getCamera().focalPoint,
      cameraPosition: viewport.getCamera().position,
    },
  }

  return annotation
}
