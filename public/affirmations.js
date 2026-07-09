const affirmations = [
  "You are capable of understanding anything you set your mind to.",
  "Every small study session adds up to big progress.",
  "Mistakes are proof that you're learning, not failing.",
  "You don't have to be perfect today — just a little better than yesterday.",
  "Your effort matters more than your speed.",
  "Rest is part of studying, not a break from it.",
  "You've handled hard things before. You can handle this too.",
  "Progress, not perfection.",
  "One page, one problem, one step at a time.",
  "You are exactly where you need to be right now.",
  "Believe in the process, even on slow days.",
  "Your future self will thank you for showing up today.",
  "Confusion means you're right at the edge of learning something new.",
  "It's okay to take breaks — your brain needs them to grow.",
  "You are more resilient than you think.",
];

const affirmationText = document.getElementById("affirmationText");
const newAffirmationBtn = document.getElementById("newAffirmationBtn");

function showRandomAffirmation() {
  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  affirmationText.textContent = random;
}

newAffirmationBtn.addEventListener("click", showRandomAffirmation);

showRandomAffirmation();