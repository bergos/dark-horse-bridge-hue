# dark-horse-bridge-hue

Dark Horse bridge for Philips Hue Bridge.
Wraps a Philips Hue Bridge with a Hydra Linked Data API.

## Usage

Copy the `run-example.sh` file to `run.sh` and adapt the variables to your environment.
The host can be detected automatically if the Hue Bridge is in the same network.
When the server runs the first time, a user will be registered and logged to the console.
This requires to press the link button on the Hue Bridge.
Copy the user to your `run.sh` to reuse it for next time.
The base URL must be set to URL the server will be reachable.
If the request will be sent from the same machine, localhost should be used.
Otherwise the IP or hostname should be used.

## Virtual Hue

The `hue-mock` server can be used to try the API if no Hue Bridge is available.
There is a preconfigured `run.sh` script in the `examples/hue-moch` folder, which makes the server accessable on the local machine.
The base URL must be adapted if the server should accept request from other machines.
