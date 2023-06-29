import { useRef, useEffect } from "react";
import {
  initDemo,
  createImageIdsAndCacheMetaData,
  ctVoiRange,
} from "../../utils";
import { RenderingEngine, StackViewport } from "@cornerstonejs/core";
import { ViewportType } from "@cornerstonejs/core/dist/esm/enums";
import {
  IStackViewport,
  PublicViewportInput,
} from "@cornerstonejs/core/dist/esm/types";
import * as cornerstoneTools from "@cornerstonejs/tools";
import {
  PanTool,
  StackScrollMouseWheelTool,
  ToolGroupManager,
  WindowLevelTool,
  ZoomTool,
} from "@cornerstonejs/tools";
import { MouseBindings } from "@cornerstonejs/tools/dist/esm/enums";

export function StackBasic() {
  const isInitialized = useRef<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function run() {
      // Init Cornerstone and related libraries
      await initDemo();

      // Add tools to Cornerstone3D
      cornerstoneTools.addTool(PanTool);
      cornerstoneTools.addTool(WindowLevelTool);
      cornerstoneTools.addTool(StackScrollMouseWheelTool);
      cornerstoneTools.addTool(ZoomTool);

      // Define a tool group, which defines how mouse events map to tool commands for
      // Any viewport using the group
      const toolGroupId = "STACK_TOOL_GROUP_ID";
      const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

      // Add tools to the tool group
      toolGroup?.addTool(WindowLevelTool.toolName);
      toolGroup?.addTool(PanTool.toolName);
      toolGroup?.addTool(ZoomTool.toolName);
      toolGroup?.addTool(StackScrollMouseWheelTool.toolName, { loop: true });

      // Set the initial state of the tools, here all tools are active and bound to
      // Different mouse inputs
      toolGroup?.setToolActive(WindowLevelTool.toolName, {
        bindings: [
          {
            mouseButton: MouseBindings.Primary, // Left Click
          },
        ],
      });
      toolGroup?.setToolActive(PanTool.toolName, {
        bindings: [
          {
            mouseButton: MouseBindings.Auxiliary, // Middle Click
          },
        ],
      });
      toolGroup?.setToolActive(ZoomTool.toolName, {
        bindings: [
          {
            mouseButton: MouseBindings.Secondary, // Right Click
          },
        ],
      });
      // As the Stack Scroll mouse wheel is a tool using the `mouseWheelCallback`
      // hook instead of mouse buttons, it does not need to assign any mouse button.
      toolGroup?.setToolActive(StackScrollMouseWheelTool.toolName);

      const { imageIds } = await createImageIdsAndCacheMetaData({
        StudyInstanceUID: "1.2.156.14702.1.1000.16.0.20200311113603875",
        SeriesInstanceUID:
          "1.2.156.14702.1.1000.16.1.2020031111365290600020002",
        wadoRsRoot: "http://localhost/dicom-web",
      });

      // Instantiate a rendering engine
      const renderingEngineId = "myRenderingEngine";
      const renderingEngine = new RenderingEngine(renderingEngineId);

      // Create a stack viewport
      const viewportId = "CT_STACK";
      const viewportInput = {
        viewportId,
        type: ViewportType.STACK,
        element: elementRef.current,
      } as PublicViewportInput;

      renderingEngine.enableElement(viewportInput);

      // Set the tool group on the viewport
      toolGroup?.addViewport(viewportId, renderingEngineId);

      // Get the stack viewport that was created
      const viewport = renderingEngine.getViewport(
        viewportId
      ) as IStackViewport;

      // Define a stack containing a single image
      const stack = imageIds;

      // Set the stack on the viewport
      viewport.setStack(stack);

      // Render the image
      viewport.render();
    }

    if (!isInitialized.current) {
      run();
      isInitialized.current = true;
    }
  }, []);

  return (
    <div id="content">
      <div
        id="cornerstone-element"
        ref={elementRef}
        style={{ width: 500, height: 500 }}
      ></div>
    </div>
  );
}
