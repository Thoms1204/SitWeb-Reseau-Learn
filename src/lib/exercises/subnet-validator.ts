import { CorrectionResult } from './correction-engine';

export type SubnetQuestion = {
  prompt: string;
  type: 'network_address' | 'broadcast' | 'host_range' | 'cidr' | 'vlsm';
};

export type SubnetAnswer = {
  networkAddress?: string;
  broadcastAddress?: string;
  firstHost?: string;
  lastHost?: string;
  cidr?: number;
  subnetMask?: string;
  hostCount?: number;
  subnets?: SubnetAnswer[];
};

export type SubnetUserAnswer = SubnetAnswer;

export function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

export function intToIp(n: number): string {
  return [
    (n >>> 24) & 255,
    (n >>> 16) & 255,
    (n >>> 8) & 255,
    n & 255,
  ].join('.');
}

export function cidrToMask(cidr: number): string {
  const mask = (0xffffffff << (32 - cidr)) >>> 0;
  return intToIp(mask);
}

export function maskToCidr(mask: string): number {
  const num = ipToInt(mask);
  let cidr = 0;
  for (let i = 31; i >= 0; i--) {
    if ((num & (1 << i)) !== 0) cidr++;
    else break;
  }
  return cidr;
}

export function calculateNetwork(ip: string, cidr: number): string {
  const mask = (0xffffffff << (32 - cidr)) >>> 0;
  return intToIp(ipToInt(ip) & mask);
}

export function calculateBroadcast(ip: string, cidr: number): string {
  const mask = (0xffffffff << (32 - cidr)) >>> 0;
  const invertedMask = ~mask >>> 0;
  return intToIp((ipToInt(ip) & mask) | invertedMask);
}

export function calculateHostRange(ip: string, cidr: number): { first: string; last: string } {
  const netInt = ipToInt(calculateNetwork(ip, cidr));
  const broadInt = ipToInt(calculateBroadcast(ip, cidr));
  return {
    first: intToIp(netInt + 1),
    last: intToIp(broadInt - 1),
  };
}

export function calculateHostCount(cidr: number): number {
  if (cidr >= 31) return 0;
  return Math.pow(2, 32 - cidr) - 2;
}

export function validateSubnetCalc(
  questionData: SubnetQuestion,
  answerData: SubnetAnswer,
  userAnswer: SubnetUserAnswer
): CorrectionResult {
  const steps: string[] = [];
  let isCorrect = true;
  
  if (answerData.networkAddress) {
    if (userAnswer.networkAddress !== answerData.networkAddress) {
      isCorrect = false;
    }
    steps.push(`Calcul de l'adresse réseau : Convertissez l'IP et le masque en binaire, puis appliquez un ET logique.`);
  }

  // Handle other comparisons similarly...

  return {
    isCorrect,
    correctAnswer: answerData,
    explanation: isCorrect ? 'Bravo, vos calculs sont corrects !' : 'Vos calculs contiennent des erreurs.',
    steps,
  };
}
