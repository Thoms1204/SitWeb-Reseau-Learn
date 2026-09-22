import { describe, it, expect } from 'vitest';
import { 
  ipToInt, intToIp, cidrToMask, maskToCidr, 
  calculateNetwork, calculateBroadcast, 
  calculateHostRange, calculateHostCount, 
  validateSubnetCalc 
} from '@/lib/exercises/subnet-validator';

describe('Subnet Validator', () => {
  describe('ipToInt and intToIp conversions', () => {
    it('should convert IPs to integers and back correctly', () => {
      const ips = ['192.168.1.0', '10.0.0.0', '255.255.255.255', '0.0.0.0'];
      for (const ip of ips) {
        expect(intToIp(ipToInt(ip))).toBe(ip);
      }
    });
  });

  describe('cidrToMask', () => {
    it('should convert CIDR to subnet mask', () => {
      expect(cidrToMask(24)).toBe('255.255.255.0');
      expect(cidrToMask(16)).toBe('255.255.0.0');
      expect(cidrToMask(8)).toBe('255.0.0.0');
      expect(cidrToMask(32)).toBe('255.255.255.255');
      expect(cidrToMask(0)).toBe('0.0.0.0');
    });
  });

  describe('maskToCidr', () => {
    it('should convert subnet mask to CIDR', () => {
      expect(maskToCidr('255.255.255.0')).toBe(24);
      expect(maskToCidr('255.255.0.0')).toBe(16);
      expect(maskToCidr('255.0.0.0')).toBe(8);
      expect(maskToCidr('255.255.255.255')).toBe(32);
      expect(maskToCidr('0.0.0.0')).toBe(0);
    });
  });

  describe('calculateNetwork', () => {
    it('should calculate the network address', () => {
      expect(calculateNetwork('192.168.1.100', 24)).toBe('192.168.1.0');
      expect(calculateNetwork('10.0.0.50', 8)).toBe('10.0.0.0');
    });
  });

  describe('calculateBroadcast', () => {
    it('should calculate the broadcast address', () => {
      expect(calculateBroadcast('192.168.1.0', 24)).toBe('192.168.1.255');
    });
  });

  describe('calculateHostRange', () => {
    it('should calculate the host range', () => {
      const range = calculateHostRange('192.168.1.0', 24);
      expect(range.first).toBe('192.168.1.1');
      expect(range.last).toBe('192.168.1.254');
    });
  });

  describe('calculateHostCount', () => {
    it('should calculate the number of hosts', () => {
      expect(calculateHostCount(24)).toBe(254);
      expect(calculateHostCount(30)).toBe(2);
      expect(calculateHostCount(31)).toBe(0);
      expect(calculateHostCount(32)).toBe(1);
    });
  });

  describe('Edge cases', () => {
    it('should handle /31 networks', () => {
      expect(calculateHostCount(31)).toBe(0);
    });
    
    it('should handle /32 host routes', () => {
      expect(calculateHostCount(32)).toBe(1);
    });
  });

  describe('validateSubnetCalc', () => {
    it('should validate correct answer', () => {
      const result = validateSubnetCalc({ network: '192.168.1.0' }, { expectedNetwork: '192.168.1.0' });
      expect(result.isCorrect).toBe(true);
    });

    it('should validate wrong network address', () => {
      const result = validateSubnetCalc({ network: '192.168.1.10' }, { expectedNetwork: '192.168.1.0' });
      expect(result.isCorrect).toBe(false);
    });
    
    it('should accept both CIDR and decimal mask formats', () => {
      const result1 = validateSubnetCalc({ mask: '255.255.255.0' }, { expectedMask: '255.255.255.0' });
      expect(result1.isCorrect).toBe(true);
      
      const result2 = validateSubnetCalc({ mask: '24' }, { expectedMask: '255.255.255.0' });
      expect(result2.isCorrect).toBe(true);
    });
  });
});
