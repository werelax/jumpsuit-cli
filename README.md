# Why is this a separate repo?

The original project has both packages (cli and regular) in the same repo and uses lerna.js to build them separately. But the original project uses a "broken" version of butler. I need to be able to fix this particular package without uploading to the npm registry (that'd be confusing).

# But... why not PR?

I fixed butler and opened a PR, but the author hasn't merged it yet. As soon as the PR is merged and the original jumpsuit updates its dependencies, this repo will disappear.
