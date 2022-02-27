/* This code was initialised by Akka Serverless tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */

import akkaserverless from "@lightbend/akkaserverless-javascript-sdk";
const ValueEntity = akkaserverless.ValueEntity;

/**
 * Type definitions.
 * These types have been generated based on your proto source.
 * A TypeScript aware editor such as VS Code will be able to leverage them to provide hinting and validation.
 * 
 * State; the serialisable and persistable state of the entity
 * @typedef { import("../lib/generated/documentservice").State } State
 * 
 * DocumentService; a strongly typed extension of ValueEntity derived from your proto source
 * @typedef { import("../lib/generated/documentservice").DocumentService } DocumentService
 */

/**
 * @type DocumentService
 */
const entity = new ValueEntity(
  [
    "document_domain.proto",
    "document_api.proto"
  ],
  "com.lightbend.demos.DocumentService",
  "document",
  {
    includeDirs: ["./proto"],
    serializeFallbackToJson: false
  }
);

const DocumentState = entity.lookupType("com.lightbend.demos.domain.DocumentState");
entity.setInitial(entityId =>DocumentState.create());

entity.setCommandHandlers({
  Set(command, state, ctx) {
    console.log(command.value);
    console.log(JSON.stringify(command.value.toJSON()));
    state.value = command.value;
    ctx.updateState(state);
    return {};
  },
  Get(command, state, ctx) {
    return {value: state.value};
  }
});

export default entity;