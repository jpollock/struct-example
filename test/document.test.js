/* This code was initialised by Akka Serverless tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */

import { MockValueEntity } from "./testkit.js";
import { expect } from "chai";
import document from "../src/document.js";

describe("DocumentService", () => {
  const entityId = "entityId";
  
  describe("Set", () => {
    it("should...", () => {
      const entity = new MockValueEntity(document, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = entity.handleCommand("Set", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
    });
  });
  
  describe("Get", () => {
    it("should...", () => {
      const entity = new MockValueEntity(document, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = entity.handleCommand("Get", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
    });
  });
});