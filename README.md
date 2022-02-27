# struct

Welcome to the project generated by Akka Serverless code generation tools! The tools have generated a project, an example Akka Serverless service, and tests. You can modify the project with your own logic. When you rebuild, the tools will generate implementation and test stubs to accelerate development.

## Prerequisites

No additional tooling is required to develop locally. To package and deploy to Akka Serverless, you will need the following:

- Docker; see https://docs.docker.com/engine/install/
- Akka Serverless CLI (`akkasls`); see https://developer.lightbend.com/docs/akka-serverless/getting-started/set-up-development-env.html#_akka_serverless_cli

## Project overview

Take a look at what the tools generated for you:

- The top level directory, `struct`, contains build and packaging configuration, which are described in more detail below.
- The `proto` folder contains `protobuf` descriptors written in the [Proto3](https://developers.google.com/protocol-buffers/docs/proto3) Protocol Buffers Language. The `.proto` files in this folder specify messages describing the external APIs for your service as well as the internal data structures.

To understand Akka Serverless services, `protobuf` descriptors, and Entities, see the documentation on [designing services](https://developer.lightbend.com/docs/akka-serverless/designing/index.html).

## Developing

This project has a bare-bones service ready for you to adapt and
extend. To see the range of functionality available for you to use with the Akka Serverless JavaScript SDK, see the documentation [JavaScript section](https://developer.lightbend.com/docs/akka-serverless/javascript/index.html). After you have modified any source files, build and the tools will preserve your changes as well as generate stubs for you to implement.

## Building

To build, at a minimum you need to generate and process sources, particularly when using an IDE.
A convenience is compile your project:

```
npm install
npm run build
```

## Testing

Running build generates basic skeleton unit tests for each method in each service. You will need to flesh them out with assertions as behavior is implemented. The testing framework used by the tools is Mocha. You should use Chai for assertions. To execute the tests:

```
npm run test
```

These tests leverage the mock event-sourced entity classes provided by `testkit.js`. These classes mimic the minimal required machinery to execute commands and handle events against a single entity for simple unit testing. In the future, more complicated testing can leverage the Akka Serverless integration test-kit which runs the proxy inside docker (see [this example](https://github.com/lightbend/akkaserverless-framework/blob/master/javascript-sdk/integration-test/integration-testkit-test.js)).

## Running Locally

To run your application locally, you must run the Akka Serverless proxy. The included `docker-compose` file contains the configuration required to run the proxy for a locally running application. It also contains the configuration to start a local Google Pub/Sub emulator that the Akka Serverless proxy will connect to.

To start the proxy, run the following command from this directory:

```
docker-compose up
```

To start the application locally, use the following commands:

> Be sure to have performed `npm install` for the first time!

```
npm run build && npm run start
```

With both the proxy and your application running, any defined endpoints should be available at `http://localhost:9000`. In addition to the defined gRPC interface, each method has a corresponding HTTP endpoint. Unless configured otherwise (see [Transcoding HTTP](https://developer.lightbend.com/docs/akka-serverless/javascript/proto.html#_transcoding_http)), this endpoint accepts POST requests at the path `/[package].[entity name]/[method]`. For example, using `curl`:

```
> curl -XPOST -H "Content-Type: application/json" localhost:9000/com.example.MyServiceEntity/GetValue -d '{"entityId": "foo"}'
The command handler for `GetValue` is not implemented, yet
```

For example, given [`grpcurl`](https://github.com/fullstorydev/grpcurl):

```
> grpcurl -plaintext -d '{"entityId": "foo"}' localhost:9000 com.example.MyServiceEntity/GetValue
ERROR:
  Code: Unknown
  Message: The command handler for `GetValue` is not implemented, yet
```

> Note: The failure is to be expected if you have not yet provided an implementation of `GetValue` in
> your entity.

## Deploying to Akka Serverless

To deploy your service, install the `akkasls` CLI as documented in [Setting up a local development environment](https://developer.lightbend.com/docs/akka-serverless/getting-started/set-up-development-env.html) and configure a Docker Registry to upload your docker image to.

You will need to update the `config.dockerImage` property in the `package.json` and refer to [Configuring registries](https://developer.lightbend.com/docs/akka-serverless/projects/container-registries.html) for more information on how to make your docker image available to Akka Serverless.

Finally, you can use the [Akka Serverless Console](https://console.akkaserverless.com)
to create a project and then deploy your service into the project either by using `npm run deploy`,
through the `akkasls` CLI or via the web interface. When using `npm run deploy`, npm will also
conveniently package and publish your docker image prior to deployment.
