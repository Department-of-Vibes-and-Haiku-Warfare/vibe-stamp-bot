/**
 * VibeStamp Bot — a Probot app to auto-approve high-vibe PRs
 * Conditions:
 * - Author must be ChaosTestOps
 * - Title must include #VibeCoding
 * - Body must include one of: entropy, seal, 2:17am
 */
process.env.LOG_LEVEL = 'debug';

export default (app) => {
  console.log("🔥🔥🔥 PR EVENT TRIGGERED 🔥🔥🔥");
  console.log("🚨 VibeStamp Bot initialized 🚨");
  app.onAny(async (context) => {
    console.log(`👀 Received event: ${context.name}`);
  });
  app.on(['pull_request.opened', 'pull_request.reopened', 'pull_request.synchronize'], async (context) => {
    const pr = context.payload.pull_request;
    const author = pr.user.login;
    const title = pr.title.toLowerCase();
    const body = (pr.body || '').toLowerCase();

    const vibeKeywords = ['entropy', 'seal', '2:17am'];

    const isChaos = author === 'ChaosTestOps';
    const hasVibeTitle = title.includes('#vibecoding');
    const hasVibeBody = vibeKeywords.some(keyword => body.includes(keyword));
    if (isChaos && hasVibeTitle && hasVibeBody) {
      console.log(`Vibe check passed for PR #${pr.number}. Auto-approving.`);
      
      try {
        await context.octokit.pulls.createReview({
          owner: context.payload.repository.owner.login,
          repo: context.payload.repository.name,
          pull_number: pr.number,
          event: 'APPROVE',
          body: '🔏 VibeStamp has affixed its mark. Proceed.'
        });
      } catch (error) {
        console.log(`Error during review creation for PR #${pr.number}: ${error.message}`);
      }
    } else {
      console.log(`Vibe check failed for PR #${pr.number}. Manual review required.`);
    }
  });
};
