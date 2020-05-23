# DAM Pig: Command Library

## Overview

Includes our command architecture. Allows one to create and queue up `Commands`.

## Quick Start

* [configure](src/configuration.js) the library. We pulled commands out of our applications. Within our apps we had the advantage of 
exposing our command architecture to the application configuration. We loose that here. This guy facilitates a subset of the power of 
application configuration. He manages a single configuration that you the user of this lib **should** configure.
