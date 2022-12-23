class ResponseContentBuilder {
    static getRequestQuestResponse(data) {
        let response = '';
        for (let quest of data.Responses.RANK_C_QUESTS) { //FIXME MIGHT BE QUESTS OF ANOTHER RANK
            response += `(${quest.QUEST_ID}) - ${quest.title} - ${quest.description}\n`;
            response += `Reward: ${quest.mission_reward}\n`;
            response += `Skill check: ${quest.skill_check}\n`;
            response += '\n';
        }
        return response;
    }
}

module.exports = ResponseContentBuilder