import BaseTool from './base/BaseTool.js';
import BaseAnnotationTool from './base/BaseAnnotationTool.js';
import BaseBrushTool from './base/BaseBrushTool.js';

import anyHandlesOutsideImage from './manipulators/anyHandlesOutsideImage.js';
import drawHandles from './manipulators/drawHandles.js';
import getHandleNearImagePoint from './manipulators/getHandleNearImagePoint.js';
import handleActivator from './manipulators/handleActivator.js';
import moveAllHandles from './manipulators/moveAllHandles.js';
import moveHandle from './manipulators/moveHandle.js';
import moveNewHandle from './manipulators/moveNewHandle.js';
import moveNewHandleTouch from './manipulators/moveNewHandleTouch.js';
import touchMoveAllHandles from './manipulators/touchMoveAllHandles.js';
import touchMoveHandle from './manipulators/touchMoveHandle.js';

import mixins from './mixins/index.js';

import textStyle from './stateManagement/textStyle.js';
import toolColors from './stateManagement/toolColors.js';
import toolCoordinates from './stateManagement/toolCoordinates.js';
import {
  addToolState,
  getToolState,
  removeToolState,
  clearToolState,
  setElementToolStateManager,
  getElementToolStateManager
} from './stateManagement/toolState.js';
import {
  addTimeSeriesStateManager,
  newTimeSeriesSpecificToolStateManager
} from './stateManagement/timeSeriesSpecificStateManager.js';
import {
  stackSpecificStateManager,
  newStackSpecificToolStateManager,
  addStackStateManager
} from './stateManagement/stackSpecificStateManager.js';
import loadHandlerManager from './stateManagement/loadHandlerManager.js';
import {
  newImageIdSpecificToolStateManager,
  globalImageIdSpecificToolStateManager
} from './stateManagement/imageIdSpecificStateManager.js';
import {
  newFrameOfReferenceSpecificToolStateManager,
  globalFrameOfReferenceSpecificToolStateManager
} from './stateManagement/frameOfReferenceStateManager.js';
import {
  setToolPassiveForElement,
  setToolActiveForElement,
  setToolEnabledForElement,
  setToolDisabledForElement
} from './store/setToolMode.js';
import {
  state,
  getters,
  modules
} from './store/index.js';
import {
  getNewContext,
  draw,
  path,
  setShadow,
  drawLine,
  drawLines,
  drawJoinedLines,
  drawCircle,
  drawEllipse,
  drawRect,
  fillOutsideRect,
  fillBox,
  fillTextLines
} from './util/drawing.js';
import drawTextBox from './util/drawTextBox.js';
import drawArrow from './util/drawArrow.js';
import getLuminance from './util/getLuminance.js';
import copyPoints from './util/copyPoints.js';
import calculateSUV from './util/calculateSUV.js';
import calculateEllipseStatistics from './util/calculateEllipseStatistics.js';
import setContextToDisplayFontSize from './util/setContextToDisplayFontSize.js';
import scrollToIndex from './util/scrollToIndex.js';
import scroll from './util/scroll.js';
import roundToDecimal from './util/roundToDecimal.js';
import {
  projectPatientPointToImagePlane,
  imagePointToPatientPoint,
  planePlaneIntersection
} from './util/pointProjector.js';

import pointInsideBoundingBox from './util/pointInsideBoundingBox.js';
import pointInEllipse from './util/pointInEllipse.js';
import makeUnselectable from './util/makeUnselectable.js';
import getRGBPixels from './util/getRGBPixels.js';
import {
  getDefaultSimultaneousRequests,
  getMaxSimultaneousRequests,
  getBrowserInfo,
  isMobileDevice
} from './util/getMaxSimultaneousRequests.js';

export const lib = {
  'store/state': state,
  'store/getters': getters,
  'store/modules': modules,
  'store/setToolPassiveForElement': setToolPassiveForElement,
  'store/setToolActiveForElement': setToolActiveForElement,
  'store/setToolEnabledForElement': setToolEnabledForElement,
  'store/setToolDisabledForElement': setToolDisabledForElement,

  'base/BaseTool': BaseTool,
  'base/BaseAnnotationTool': BaseAnnotationTool,
  'base/BaseBrushTool': BaseBrushTool,

  'manipulators/anyHandlesOutsideImage': anyHandlesOutsideImage,
  'manipulators/drawHandles': drawHandles,
  'manipulators/getHandleNearImagePoint': getHandleNearImagePoint,
  'manipulators/handleActivator': handleActivator,
  'manipulators/moveAllHandles': moveAllHandles,
  'manipulators/moveHandle': moveHandle,
  'manipulators/moveNewHandle': moveNewHandle,
  'manipulators/moveNewHandleTouch': moveNewHandleTouch,
  'manipulators/touchMoveAllHandles': touchMoveAllHandles,
  'manipulators/touchMoveHandle': touchMoveHandle,

  'mixins/activeOrDisabledBinaryTool': mixins.activeOrDisabledBinaryTool,
  'mixins/enabledOrDisabledBinaryTool': mixins.enabledOrDisabledBinaryTool,

  'stateManagement/textStyle': textStyle,
  'stateManagement/toolColors': toolColors,
  'stateManagement/toolCoordinates': toolCoordinates,
  'stateManagement/addToolState': addToolState,
  'stateManagement/getToolState': getToolState,
  'stateManagement/removeToolState': removeToolState,
  'stateManagement/clearToolState': clearToolState,
  'stateManagement/setElementToolStateManager': setElementToolStateManager,
  'stateManagement/getElementToolStateManager': getElementToolStateManager,
  'stateManagement/addTimeSeriesStateManager': addTimeSeriesStateManager,
  'stateManagement/newTimeSeriesSpecificToolStateManager': newTimeSeriesSpecificToolStateManager,
  'stateManagement/stackSpecificStateManager': stackSpecificStateManager,
  'stateManagement/newStackSpecificToolStateManager': newStackSpecificToolStateManager,
  'stateManagement/addStackStateManager': addStackStateManager,
  'stateManagement/loadHandlerManager': loadHandlerManager,
  'stateManagement/newImageIdSpecificToolStateManager': newImageIdSpecificToolStateManager,
  'stateManagement/globalImageIdSpecificToolStateManager': globalImageIdSpecificToolStateManager,
  'stateManagement/newFrameOfReferenceSpecificToolStateManager': newFrameOfReferenceSpecificToolStateManager,
  'stateManagement/globalFrameOfReferenceSpecificToolStateManager': globalFrameOfReferenceSpecificToolStateManager,

  'drawing/getNewContext': getNewContext,
  'drawing/draw': draw,
  'drawing/path': path,
  'drawing/setShadow': setShadow,
  'drawing/drawLine': drawLine,
  'drawing/drawLines': drawLines,
  'drawing/drawJoinedLines': drawJoinedLines,
  'drawing/drawCircle': drawCircle,
  'drawing/drawEllipse': drawEllipse,
  'drawing/drawRect': drawRect,
  'drawing/fillOutsideRect': fillOutsideRect,
  'drawing/drawTextBox': drawTextBox,
  'drawing/drawArrow': drawArrow,
  'drawing/fillBox': fillBox,
  'drawing/fillTextLines': fillTextLines,

  'util/getLuminance': getLuminance,
  'util/copyPoints': copyPoints,
  'util/calculateSUV': calculateSUV,
  'util/calculateEllipseStatistics': calculateEllipseStatistics,
  'util/setContextToDisplayFontSize': setContextToDisplayFontSize,
  'util/scrollToIndex': scrollToIndex,
  'util/scroll': scroll,
  'util/roundToDecimal': roundToDecimal,
  'util/projectPatientPointToImagePlane': projectPatientPointToImagePlane,
  'util/imagePointToPatientPoint': imagePointToPatientPoint,
  'util/planePlaneIntersection': planePlaneIntersection,
  'util/pointInsideBoundingBox': pointInsideBoundingBox,
  'util/pointInEllipse': pointInEllipse,
  'util/makeUnselectable': makeUnselectable,
  'util/getRGBPixels': getRGBPixels,
  'util/getDefaultSimultaneousRequests': getDefaultSimultaneousRequests,
  'util/getMaxSimultaneousRequests': getMaxSimultaneousRequests,
  'util/getBrowserInfo': getBrowserInfo,
  'util/isMobileDevice': isMobileDevice
};
