import { JSX } from "react";

export default async function Prompt() {
  const paragraph = (content: JSX.Element) => <p>{content}</p>;

  const inlinecode = (content: JSX.Element) => (
    <code className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md  font-mono">
      {content}
    </code>
  );

  const quote = (content: JSX.Element) => (
    <div className="relative p-6 border-t-2 border-b-2 border-blue-500 bg-blue-50 rounded-md">
      <span className="absolute -top-1 -left-1 text-6xl text-blue-300 opacity-80 font-serif select-none">
        &ldquo;
      </span>
      <p className="italic text-lg pl-8">{content}</p>
      <span className="absolute -bottom-9 -right-1 text-6xl text-blue-300 opacity-80 font-serif select-none">
        &rdquo;
      </span>
    </div>
  );

  return (
    <div className="PostPage">
      <div className="Post">
        <a className="title">
          AI-Generated <i>Playable</i> Drone Scenarios
        </a>
        <div className="authorId">henry</div>
        <div
          className="body"
          style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
        >
          {paragraph(
            <>
              The following prompt is used to generate a natural-language
              description of a drone maneuvering scenario.
            </>,
          )}
          {quote(
            <>
              Write a description of a specific and simple drone maneuvering
              scenario that relates to the difficulties discussed in the
              attached JSON representation of a forum discussion. Make sure to
              include all the most important specific details of the scenario
              mentioned in the post and comments, such as drone maneuvers,
              objects, and locations. Here is the JSON encoding of the forum
              conversation: <br />
              <br />
              {inlinecode(<>JSON encoding of forum discussion</>)}
            </>,
          )}
          <p>
            Then, given this natural-language description, the following prompt
            is used with{" "}
            <a href="https://platform.openai.com/docs/guides/structured-outputs">
              structured output
            </a>{" "}
            to generate a structured specification of a level that can be loaded
            into the PicoSim drone simulator.
          </p>
          {quote(
            <>
              {`
You are an assistant for designing levels for a new video game where the player flies a drone through an indoor environment (in a mansion). Take into account the user's description of the level in order to produce a structured level specification. Make sure to take into account EVERYTHING that the user wants in the level.

Keep in mind the following important notes:
- Create only 1-3 checkpoints.
- You may use any number of copies of each object. Make sure to place many objects! At least 10 or so.
- VERY IMPORTANT: no two things can be put at the exact same location. Each thing (startpoint, endpoint, checkpoint, ir object) must be placed at a UNIQUE location. But still, the same room can have multiple things in it.
- Choose reasonable values for the environmental settings
- Be creative!
`.trim()}
              <br />
              <br />
              {inlinecode(<>JSON encoding of forum discussion</>)}
            </>,
          )}
          {paragraph(
            <>
              The following is the <a href="https://zod.dev/">zod</a> schema for
              the structured outputs. So, the AI generation is able to
              configured all the settings of a {inlinecode(<>Level</>)}.
            </>,
          )}
          <div
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-md overflow-x-auto font-mono text-sm
"
          >{`export type LocationId = z.infer<typeof LocationId_Schema>;
          export const LocationId_Schema = z
            .enum([
              "bottom corner of corner room with stairs",
              "base of stairs of corner room with stairs",
              "middle flight of corner room with stairs",
              "top of stairs of corner room with stairs",
              "corner entrance of long bottom room",
              "middle of long bottom room",
              "facing archway door of small corner room",
              "dark side of light and dark room",
              "light side of light and dark room",
              "in corner of checker corner room",
              "archway into light and dark room of checker corner room",
              "base of stairs of main stairway",
              "middle flight of main stairway",
              "top flight of main stairway",
              "sky light of main stairway",
              "middle of small boring room",
              "middle of tile bathroom",
              "middle of top boring room",
              "corner of top light room",
              "doorway of top light room",
              "by stairs of top hallway",
              "by narrow door room of top hallway",
              "middle of hallway of top hallway",
              "by window of top big light room",
              "by door of top big light room",
              "back of room of tight doorway room",
              "by tight door of tight doorway room",
            ])
            .describe("A specific location in the level.");

          export type ObjectId = z.infer<typeof ObjectId_Schema>;
          export const ObjectId_Schema = z
            .enum([
              "barrels",
              "coffeeTable",
              "fan",
              "grenadeCrate",
              "marbleTable",
              "medicalKit",
              "metalBarrel",
              "tu95",
              "woodenChair",
              "woodenRoomDivider",
              "woodenTable",
            ])
            .describe("An object that can be placed in the level.");

          export type Spec = z.infer<typeof Spec_Schema>;
          export const Spec_Schema = z.object({
            name: z.string().describe("A short name for the level specification."),
            description: z
              .string()
              .describe(
                "A longer description of what the inspiration for the level was and many details about the level.",
              ),
            environmentTemperature: z
              .number()
              .describe(
                "The environment's temperature, in Fahrenheit. The default temperature should be 70F.",
              ),
            pingDelay: z
              .number()
              .describe(
                "The delay between pings, in milliseconds. The default ping should be 75ms.",
              ),
            windEnabled: z
              .boolean()
              .describe("Whether wind is enabled. By default, there should be no wind."),
            lightingLevel: z
              .number()
              .min(0)
              .max(1)
              .describe(
                "The lighting intensity level. All light intensities are multiplied by this, so 0 is completely dark and 1 is normal instensity.",
              ),
            checkpoint_locationIds: z
              .array(LocationId_Schema)
              .describe(
                "The locations at which to put checkpoints. The player must touch each checkpoint in order to complete the level.",
              ),
            startpoint_locationId: LocationId_Schema.describe(
              "The player's starting point.",
            ),
            endpoint_locationId: LocationId_Schema.describe(
              "The player's target endpoint they need to get to in order to complete the level.",
            ),
            objects: z
              .array(
                z
                  .object({
                    objectId: ObjectId_Schema.describe("The object to place."),
                    locationId: LocationId_Schema.describe(
                      "The location where the place the object.",
                    ),
                  })
                  .describe("An object and it's placement in the level."),
              )
              .describe("The objects in the level."),
          });
`}</div>
        </div>
      </div>
    </div>
  );
}
