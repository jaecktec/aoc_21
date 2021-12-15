import neo4j from 'neo4j-driver';

const parseInput = (input: string): number[][] => {
  return input.split('\n').map((i) => [...i].map(it => parseInt(it)));
};

export const padArray = (input: number[][], padding: number): number[][] => {
  const result = new Array(input.length + 2);
  result[0] = new Array(input[0].length + 2).fill(padding);
  result[input.length + 1] = new Array(input[0].length + 2).fill(padding);
  for (let i = 0; i < input.length; i++) {
    result[i + 1] = [padding, ...input[i], padding];
  }
  return result;
};

export const solve1 = async (rawInput: string): Promise<number> => {
  // const container = await new Neo4jContainer()
  //   .withEnv('NEO4J_AUTH', 'none')
  //   .withExposedPorts(7474)
  //   .start();
  // const driver = neo4j.driver(container.getBoltUri());
  const driver = neo4j.driver(`bolt://localhost:7687`);
  let session = driver.session();
  const parsedInput = parseInput(rawInput);
  const locName = (x: number, y: number) => `loc_${x}_${y}`;
  const input = padArray(parsedInput, 90000000);
  await session.run('MATCH (n) DETACH DELETE n');
  let insertQUery = ``
  for (let x = 0; x < input.length; x++) {
    for (let y = 1; y < input.length - 1; y++) {
      insertQUery += `MERGE (:Loc {name: '${locName(x,y)}'})\n`;
    }
  }
  await session.run(insertQUery);

  return 0;

  let relationsQuery = ''
  for (let x = 1; x < input.length - 1; x++) {
    for (let y = 1; y < input[x].length - 1; y++) {
      const location = locName(x, y);
      const cost = input[x][y];
      const fromLocations = [
        locName(x - 1, y),
        locName(x + 1, y),
        locName(x, y - 1),
        locName(x, y + 1),
      ];
      for (const from of fromLocations) {
        relationsQuery += `MATCH (from:Loc{name: '${from}'})
        MATCH (to:Loc{name: '${location}'})
        MERGE (from)-[:ROAD {cost:${cost}}]->(to);`;
      }
    }
  }
  await session.run(relationsQuery);
  console.log('stored all items');

  try{
    await session.run(`
    CALL gds.graph.create(
      'myGraph',
      'Loc',
      '*',
      {
          relationshipProperties: 'cost'
      }
    )`
    );
  }catch (e){

  }


  const result = await session.run(`
    MATCH (start:Loc{name: $from})
    MATCH (end:Loc{name: $to})
    
    CALL gds.shortestPath.dijkstra.stream('myGraph', {
        sourceNode: id(start),
        targetNode: id(end),
        relationshipWeightProperty: 'cost'
    })
    
    YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
    RETURN
        index,
        gds.util.asNode(sourceNode).name AS sourceNodeName,
        gds.util.asNode(targetNode).name AS targetNodeName,
        totalCost,
        [nodeId IN nodeIds | gds.util.asNode(nodeId).name] AS nodeNames,
        costs,
        nodes(path) as path
    ORDER BY index
  `, {
    from: locName(1, 1),
    to: locName(input[0].length - 2, input.length - 2),
  });

  // const result = await session.run(
  //   'CREATE (a:Person {name: $name}) RETURN a',
  //   { name: "personName" }
  // )
  await session.close();
  const totalCost = result.records[0].get('totalCost')
  await driver.close()
  return totalCost;
};

export const solve2 = (input: string): number => {
  const parsedInput = parseInput(input);
  let result = 0;

  return result;
};